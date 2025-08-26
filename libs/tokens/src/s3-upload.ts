import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

interface S3Config {
  bucketName: string;
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

interface UploadOptions {
  filePath: string;
  key: string;
  contentType?: string;
  cacheControl?: string;
  acl?: ObjectCannedACL;
}

export class S3Uploader {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(config: S3Config) {
    this.bucketName = config.bucketName;

    this.s3Client = new S3Client({
      region: config.region,
      credentials: config.accessKeyId && config.secretAccessKey ? {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      } : undefined,
    });
  }

  async uploadFile(options: UploadOptions): Promise<string> {
    try {
      const fileContent = readFileSync(options.filePath);

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: options.key,
        Body: fileContent,
        ContentType: options.contentType,
        CacheControl: options.cacheControl,
        ACL: options.acl,
      });

      await this.s3Client.send(command);

      const url = `https://${this.bucketName}.s3.amazonaws.com/${options.key}`;
      console.log(`✅ Uploaded: ${options.key} -> ${url}`);

      return url;
    } catch (error) {
      console.error(`❌ Failed to upload ${options.key}:`, error);
      throw error;
    }
  }

  async uploadCSSFiles(distPath: string, version: string): Promise<string[]> {
    if (!existsSync(distPath)) {
      console.warn(`⚠️ No directory found at ${distPath}, skipping upload`);
      return [];
    }

    const cssFiles = readdirSync(distPath).filter(f => f.endsWith('.css'));

    if (cssFiles.length === 0) {
      console.warn(`⚠️ No CSS files found in ${distPath}, skipping upload`);
      return [];
    }

    const uploadPromises = cssFiles.map(cssFile => {
      const brandName = cssFile.replace('.css', '');
      const versionedFileName = `${brandName}-${version}.css`;
      const s3Key = `design-tokens/${versionedFileName}`;

      return this.uploadFile({
        filePath: join(distPath, cssFile),
        key: s3Key,
        contentType: 'text/css',
        cacheControl: 'public, max-age=0',
        acl: 'public-read',
      });
    });

    return Promise.all(uploadPromises);
  }
}

export function getPackageVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf8'));
    return pkg.version || '0.0.1';
  } catch {
    console.warn('Could not read package.json version, using default');
    return '0.0.1';
  }
}

export function getS3ConfigFromEnv(): S3Config {
  return {
    bucketName: process.env['S3_BUCKET_NAME'] || '',
    region: process.env['AWS_REGION'] || 'us-east-1',
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  };
}

import StyleDictionary from 'style-dictionary';
import { S3Uploader, getPackageVersion, getS3ConfigFromEnv } from './s3-upload';

type Theme = {
  id: string;
  name: string;
  selectedTokenSets: {
    [key: string]: string;
  };
}

function getSources(sources: Record<string, string>): string[] {
  return Object
    .entries(sources)
    .sort(([, typeA]) => typeA === 'enabled' ? -1 : 1)
    .map(([source]) => `./src/tokens/${source}.json`);
}

const themes: Theme[] = require('./tokens/$themes.json');

console.log('📦  Compiling tokens...');

const promises = themes.map((theme) => {
  const destination = theme.name.toLowerCase().replace(/ /g, '-') + '.css';
  const source = getSources(theme.selectedTokenSets);

  console.log('📦  Compiling to', destination);
  console.log('📦  Using sources', source);

  const sd = new StyleDictionary({
    source,
    platforms: {
      web: {
        transformGroup: "css",
        buildPath: "dist/",
        files: [{ destination, format: "css/variables" }]
      }
    }
  });

  sd.log.verbosity = 'verbose';
  return sd.buildAllPlatforms();
});

function uploadConfigured(): Promise<void> {
  // Check if S3 upload is configured
  const s3Config = getS3ConfigFromEnv();
  if (!s3Config.bucketName) {
    console.log('⚠️   S3_BUCKET_NAME not configured, skipping upload');
    return Promise.resolve();
  }

  console.log('📤  Starting S3 upload...');
  const uploader = new S3Uploader(s3Config);
  const version = getPackageVersion();
  return uploader.uploadCSSFiles('./dist', version).then((uploadedUrls) => {
    console.log('✅  S3 upload complete!');
    console.log('📋  Uploaded files:');
    uploadedUrls.forEach(url => console.log(`   ${url}`));
  });
}

Promise
  .all(promises)
  .then(() => {
    console.log('✅  Style Dictionary compilation complete');
  })
  .then(() => uploadConfigured())
  .then(() => {
    console.log('✅  Done');
  })
  .catch((error) => {
    console.error('❌  Build/Upload failed:', error);
    process.exit(1);
  });

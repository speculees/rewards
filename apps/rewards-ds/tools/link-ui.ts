import { execSync } from 'child_process';
import { join, relative } from 'path';

const distPath = join(__dirname, '../../..', 'dist/libs/ui');
const appPath = join(__dirname, '../../..', 'apps/rewards-ds');

try {
  console.log('🔧 Building UI library...');
  execSync('pnpx nx build ui', { stdio: 'inherit' });

  console.log('🔗 Installing local UI package in rewards-ds...');
  const relativeDistPath = relative(appPath, distPath).replace(/\\/g, '/');
  execSync(`pnpm install "${relativeDistPath}"`, { cwd: appPath, stdio: 'inherit' });


  console.log('✅ Linked successfully!');
} catch (err) {
  console.error('❌ Error during linking:', err);
  process.exit(1);
}

process.exit(0);

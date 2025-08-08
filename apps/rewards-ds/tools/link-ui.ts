// tools/link-ui.ts
import { execSync } from 'child_process';
import { join } from 'path';

const distPath = join(__dirname, '../../..', 'dist/libs/ui');

try {
  console.log('🔧 Building UI library...');
  execSync('pnpx nx build ui', { stdio: 'inherit' });

  console.log('🔗 Linking UI library globally...');
  execSync(`pnpm link --global ${distPath}`, { stdio: 'inherit' });

  console.log('🔗 Linking UI library into rewards-ds app...');
  execSync('pnpm link @rewards-ds/ui', {
    cwd: join(__dirname, '../../..', 'apps/rewards-ds'),
    stdio: 'inherit',
  });

  console.log('✅ Linked successfully!');
} catch (err) {
  console.error('❌ Error during linking:', err);
  process.exit(1);
}

process.exit(0);

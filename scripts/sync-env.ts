// scripts/sync-env.ts

import fs from 'fs';
import path from 'path';

const rootEnvPath = path.resolve('.env');
const backendEnvPath = path.resolve('backend/.env');

try {
  // Sync .env from root to backend/.env
  const envContents = fs.readFileSync(rootEnvPath, 'utf-8');
  fs.writeFileSync(backendEnvPath, envContents);
  console.log('✅ Synced .env to backend/.env');
} catch (err) {
  console.error('❌ Failed to sync .env:', (err as Error).message);
  process.exit(1);
}

// Auto-cleanup on exit (e.g. Ctrl+C, kill, or normal stop)
const cleanup = () => {
  try {
    if (fs.existsSync(backendEnvPath)) {
      fs.unlinkSync(backendEnvPath);
      console.log('🧹 Cleaned up backend/.env');
    }
  } catch (err) {
    console.warn('⚠️ Failed to clean up backend/.env:', (err as Error).message);
  }
  process.exit(); // ensure proper shutdown
};

// Hook into various exit signals
process.on('SIGINT', cleanup); // Ctrl+C
process.on('SIGTERM', cleanup); // kill
process.on('exit', cleanup); // normal exit

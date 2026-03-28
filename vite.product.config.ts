import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const siteRoot = process.cwd();
  const repoRoot = path.resolve(siteRoot, '../..');

  return {
    root: siteRoot,
    publicDir: path.resolve(repoRoot, 'public'),
    plugins: [react()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    server: {
      fs: {
        allow: [repoRoot, siteRoot],
      },
    },
    build: {
      outDir: path.resolve(siteRoot, 'dist'),
      emptyOutDir: true,
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  json: {
    stringify: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: '[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
      },
    },
  },
});

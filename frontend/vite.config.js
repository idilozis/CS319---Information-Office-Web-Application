import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/static/', // Ensures the correct base path for Django static files
  build: {
    outDir: 'dist', // Output directory for production build
    assetsDir: 'assets', // Directory for static assets (CSS/JS)
    manifest: true, // Enable manifest.json
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // Entry point for the app
    },
  },
})
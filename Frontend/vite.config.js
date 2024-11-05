import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://videotube-two.vercel.app/videos/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // This line can be removed if you want to send the request directly to the target URL
      },
    },
  },
});

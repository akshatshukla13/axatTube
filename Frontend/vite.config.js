import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adjusting the alias to point to the src directory
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://videotube-two.vercel.app',
        changeOrigin: true, // This is important for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // This removes the /api prefix before forwarding
      },
    },
  },
});

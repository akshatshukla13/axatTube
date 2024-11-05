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
      '/api': "https://videotube-two.vercel.app", // Ensure this endpoint is correct
    },
  },
});

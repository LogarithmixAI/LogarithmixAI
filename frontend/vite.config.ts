import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  server: {
    port: 5173,
    host: true, // Allows network access (useful for Docker/mobile testing)
    
    // Explicit HMR configuration to fix WebSocket connection errors
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      // If you're behind a reverse proxy, uncomment and set the clientPort:
      // clientPort: 5173,
    },
    
    proxy: {
      // Proxy all /api requests to your Flask backend on port 8001
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying (if needed)
        // Do NOT rewrite the path – backend expects /api/auth/login, /api/public/organizations etc.
      },
    },
  },
});
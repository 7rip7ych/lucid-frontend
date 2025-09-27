import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
  base: '/lucid-frontend',
  build: {
    rollupOptions: {
      external: ['./react-router', './react-router-dom']
    }
  }
});

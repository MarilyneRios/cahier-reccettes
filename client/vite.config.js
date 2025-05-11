import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
     ...(isProduction ? [] : [visualizer()]),
  ],
  optimizeDeps: {
    exclude: ['chunk-m324agam.js']
  },
  css: {
    modules: true, 
  },
});
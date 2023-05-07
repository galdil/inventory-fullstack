import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@common/sharedTypes': path.resolve(__dirname, '../common/sharedTypes.d.ts'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react()],
});

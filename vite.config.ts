import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    checker({
      typescript: true,
    }),
  ],
  base: '/',

  //   preview: {
  //     port: 5000,
  //   },
  server: {
    host: '0.0.0.0',
    port: 4500,
  },
});

// new chnanges

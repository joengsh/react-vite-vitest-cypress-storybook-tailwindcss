import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { ViteAliases } from 'vite-aliases';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ViteAliases(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        // TODO: update path
        find: '@common',
        replacement: path.resolve(__dirname, '../fe-design-system-ts/src'),
      },
      {
        // TODO: update path
        find: '@connection',
        replacement: path.resolve(__dirname, '../fe-connection-ts/src'),
      },
    ],
  },
});

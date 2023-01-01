import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { ViteAliases } from 'vite-aliases';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ViteAliases(),
    checker({
      typescript: true,
    }),
    svgr(),
    istanbul({
      cypress: true,
      requireEnv: false,
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

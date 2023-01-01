import { defineConfig, configDefaults } from 'vitest/config';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      all: true,
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage/unit',
      include: ['src/**/*'],
      exclude: [...configDefaults.exclude, 'config/vitest/*', 'src/**/*.stories.*'],
    },
    setupFiles: './config/vitest/setup.js',
  },
  plugins: [svgr()],
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
      {
        find: '@storybook/jest',
        replacement: 'vitest',
      },
    ],
  },
});

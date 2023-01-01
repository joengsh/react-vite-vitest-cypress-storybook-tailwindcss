import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      coverageTask(on, config);
      return config;
    },
  },
});

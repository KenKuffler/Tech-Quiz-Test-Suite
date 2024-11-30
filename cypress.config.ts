import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false, // Disables support file for E2E tests
    setupNodeEvents(on, config) {
      // Node event listeners for E2E
    },
  },
  component: {
    supportFile: 'cypress/support/component.js', // Enables support file for component testing
    indexHtmlFile: 'cypress/support/component-index.html', // Specifies the custom index.html for component testing
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      // Node event listeners for component tests
    },
  },
});


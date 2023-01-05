import { API_BASE_URL } from './src/core/clients/api-todo';
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation:false,
    baseUrl:API_BASE_URL
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

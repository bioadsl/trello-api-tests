const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Adiciona o plugin do Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Define o bundler para processar arquivos .feature com esbuild
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // Injeta as variáveis de ambiente (GitHub Actions / .env)
      config.env.TRELLO_API_KEY = process.env.TRELLO_API_KEY;
      config.env.TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://api.trello.com",
    supportFile: false
  }
});

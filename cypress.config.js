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
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Retorna a configuração final
      return config;
    },
    // Padrão para encontrar os arquivos .feature
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://api.trello.com",
    supportFile: false // Desativa a exigência de um arquivo de suporte
  }
});

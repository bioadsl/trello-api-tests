// cypress/support/e2e.js
// Arquivo de suporte padrão para Cypress
// Se não precisar de nada aqui, tudo bem! Mas, por padrão, vamos importar comandos customizados, se houver.

import './commands';

// Se quiser executar algum código antes de todos os testes, pode adicionar aqui.
before(() => {
  console.log('Iniciando os testes do Cypress...');
});

// Se quiser executar algum código após todos os testes, pode adicionar aqui.
after(() => {
  console.log('Finalizando os testes do Cypress.');
});

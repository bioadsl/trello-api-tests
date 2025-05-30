# Trello API Automation Tests - Cypress & BDD

Automação de testes da API do Trello utilizando Cypress com BDD. Inclui:

✅ Criação de board  
✅ Criação de card  
✅ Exclusão de card  
✅ Exclusão de board  
✅ Mapa mental ilustrativo da estratégia de testes

## Pré-requisitos

- Node.js 20.x
- Cypress 12.x
- Conta no Trello com chave e token de API

## Instalação

```bash
npm install

Executar os testes

```bash
npx cypress run

```bash
Ou, para rodar no modo interativo:

```bash
npx cypress open

## Estratégia de Testes

Estrutura do Projeto

cypress/
  e2e/
    board_card.cy.js     # Testes automatizados (Cypress + BDD)
cypress.json             # Configuração do Cypress
package.json             # Dependências e scripts
README.md

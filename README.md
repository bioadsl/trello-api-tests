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

📁 /trello-api-tests
├── 📁 cypress
│   ├── 📁 e2e
│   │   ├── 📄 board.feature
│   │   ├── 📄 card.feature
│   ├── 📁 support
│   │   ├── 📄 e2e.js
│   │   ├── 📁 step_definitions
│   │   │   ├── 📄 boardSteps.js
│   │   │   ├── 📄 cardSteps.js
│   │   └── 📁 features (opcional, se configurado!)
│   └── 📄 cypress.config.js (ou cypress.config.ts, depende do projeto)
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
└── 🛠️ outros arquivos de configuração (.gitignore, etc.)



[![Run Cypress Tests](https://github.com/bioadsl/trello-api-tests/actions/workflows/ci.yml/badge.svg)](https://github.com/bioadsl/trello-api-tests/actions/workflows/ci.yml)


# 🗺️ Mapa Mental: Testes de API com Cypress e Trello

## 🌟 Contexto
- **Projeto**: Testes automatizados usando Cypress e a API do Trello.
- **Framework**: Cypress + Cucumber (BDD).
- **API**: Trello REST API.

---

## 📂 Estrutura de Features
- **board.feature**
  - Cenário: Cadastrar um board
  - Cenário: Excluir um board

- **card.feature**
  - Cenário: Cadastrar um card
  - Cenário: Excluir um card

---

## 🔧 Fluxo dos Steps

### 🔷 Boards
- **Dado**: que desejo criar um novo board
- **Quando**: envio uma requisição para criar o board
- **Então**: o board deve ser criado com sucesso

- **Dado**: que tenho um board existente
- **Quando**: envio uma requisição para deletar o board
- **Então**: o board deve ser deletado com sucesso

---

### 🔷 Cards
- **Dado**: que tenho um board e uma lista disponíveis
- **Quando**: envio uma requisição para criar um card
- **Então**: o card deve ser criado com sucesso

- **Dado**: que tenho um card existente
- **Quando**: envio uma requisição para excluí-lo
- **Então**: o card deve ser removido com sucesso

---

## ⚙️ Variáveis Importantes
- **Cypress.env()**: 
  - `TRELLO_API_KEY`
  - `TRELLO_API_TOKEN`
- **Variáveis Locais**:
  - `boardId`, `listId`, `cardId`

---

## 🛠️ Requisições Trello
- **Criar Board**: `POST /1/boards/`
- **Criar Lista**: `POST /1/lists`
- **Criar Card**: `POST /1/cards`
- **Deletar Board**: `DELETE /1/boards/{boardId}`
- **Deletar Card**: `DELETE /1/cards/{cardId}`
- **Consultar Card**: `GET /1/cards/{cardId}`
- **Consultar Boards**: `GET /1/members/me/boards?filter={filter}`

---

## 🎯 Validadores Principais
- **Status HTTP**:
  - Criação e deleção: `200`
  - Requisição de card deletado: `404`
- **Campos esperados**: `id`, `name`, `desc`, `closed`

---

## 🧪 Ferramentas e Plugins
- **Cypress**
- **Cucumber Preprocessor** (`@badeball/cypress-cucumber-preprocessor`)
- **Trello API** (Autenticação por chave e token)

---

## 🔥 Dicas Finais
✅ Use `.env` para as chaves de API.  
✅ Garanta que a ordem de steps no Gherkin (Given/When/Then) corresponda aos arquivos JS.  
✅ Execute com `npx cypress run` ou `npx cypress open` para interface visual.  

---


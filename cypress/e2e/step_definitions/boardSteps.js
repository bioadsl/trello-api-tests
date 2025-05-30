import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let boardId;

Given("que desejo criar um novo board", () => {
  // Nenhuma preparação necessária aqui
});

When("envio uma requisição para criar o board", () => {
  cy.request({
    method: "POST",
    url: "/1/boards/",
    qs: {
      name: "BoardTest",
      key: Cypress.env("TRELLO_API_KEY"),
      token: Cypress.env("TRELLO_API_TOKEN")
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    boardId = response.body.id;
  });
});

Then("o board deve ser criado com sucesso", () => {
  expect(boardId).to.not.be.undefined;
});

Given("que tenho um board existente", () => {
  cy.request({
    method: "POST",
    url: "/1/boards/",
    qs: {
      name: "BoardDeleteTest",
      key: Cypress.env("TRELLO_API_KEY"),
      token: Cypress.env("TRELLO_API_TOKEN")
    }
  }).then((response) => {
    boardId = response.body.id;
  });
});

When("envio uma requisição para excluí-lo", () => {
  cy.request({
    method: "DELETE",
    url: `/1/boards/${boardId}`,
    qs: {
      key: Cypress.env("TRELLO_API_KEY"),
      token: Cypress.env("TRELLO_API_TOKEN")
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("o board deve ser removido com sucesso", () => {
  // Checagem extra, opcional!
  cy.request({
    method: "GET",
    url: `/1/boards/${boardId}`,
    qs: {
      key: Cypress.env("TRELLO_API_KEY"),
      token: Cypress.env("TRELLO_API_TOKEN")
    },
    failOnStatusCode: false // evita erro se já estiver 404
  }).its("status").should("eq", 404);
});

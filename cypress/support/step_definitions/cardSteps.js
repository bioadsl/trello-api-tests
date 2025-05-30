import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let boardId;
let listId;
let cardId;

Given("que tenho um board e uma lista para criar cards", () => {
  cy.request("POST", `/1/boards/?name=BoardCardTest&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((boardResponse) => {
      boardId = boardResponse.body.id;
      return cy.request("POST", `/1/lists?name=ListForCards&idBoard=${boardId}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`);
    })
    .then((listResponse) => {
      listId = listResponse.body.id;
    });
});

When("envio uma requisição para criar um card", () => {
  cy.request("POST", `/1/cards?name=TestCard&idList=${listId}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((cardResponse) => {
      expect(cardResponse.status).to.eq(200);
      cardId = cardResponse.body.id;
    });
});

Then("o card deve ser criado com sucesso", () => {
  expect(cardId).to.not.be.undefined;
  cy.request(`/1/cards/${cardId}?key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(cardId);
    });
});

Given("que tenho um card existente para exclusão", () => {
  cy.request("POST", `/1/boards/?name=BoardCardDeleteTest&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((boardResponse) => {
      boardId = boardResponse.body.id;
      return cy.request("POST", `/1/lists?name=ListForDelete&idBoard=${boardId}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`);
    })
    .then((listResponse) => {
      listId = listResponse.body.id;
      return cy.request("POST", `/1/cards?name=CardToDelete&idList=${listId}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`);
    })
    .then((cardResponse) => {
      cardId = cardResponse.body.id;
    });
});

When("envio uma requisição para excluí-lo", () => {
  cy.request("DELETE", `/1/cards/${cardId}?key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
    });
});

Then("o card deve ser removido com sucesso", () => {
  cy.request({
    method: "GET",
    url: `/1/cards/${cardId}?key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

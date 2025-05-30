import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let boardId;

Given("que desejo criar um novo board", () => {});

When("envio uma requisição para criar o board", () => {
  cy.request("POST", `/1/boards/?name=BoardTest&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
      Cypress.env("BOARD_ID", boardId);
    });
});

Then("o board deve ser criado com sucesso", () => {
  expect(boardId).to.not.be.undefined;
});

Given("que tenho um board existente", () => {
  cy.request("POST", `/1/boards/?name=BoardToDelete&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
      Cypress.env("BOARD_ID", boardId);
    });
});

When("envio uma requisição para deletar o board", () => {
  const id = Cypress.env("BOARD_ID");
  cy.request("DELETE", `/1/boards/${id}?key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
    });
});

Then("o board deve ser removido com sucesso", () => {
  const id = Cypress.env("BOARD_ID");
  cy.request({
    method: "GET",
    url: `/1/boards/${id}?key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

When("envio uma requisição para obter os boards do usuário com detalhes e filtro de visibilidade {string}", (filter) => {
  cy.request(`/1/members/me/boards?fields=name,desc,closed&filter=${filter}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
});

Then("devo receber uma lista de boards com detalhes e filtro de visibilidade {string}", (filter) => {
  cy.request(`/1/members/me/boards?fields=name,desc,closed&filter=${filter}&key=${Cypress.env("TRELLO_API_KEY")}&token=${Cypress.env("TRELLO_API_TOKEN")}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach(board => {
        expect(board).to.have.property("id");
        expect(board).to.have.property("name");
        expect(board).to.have.property("desc");
        expect(board).to.have.property("closed");
        if (filter === "open" || filter === "public" || filter === "private") {
          expect(board.closed).to.be.false;
        } else if (filter === "closed") {
          expect(board.closed).to.be.true;
        }
      });
    });
});

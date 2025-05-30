import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let boardId;

Given("que desejo criar um novo board", () => {
  // Preparação (se necessária)
});

When("envio uma requisição para criar o board", () => {
  cy.request("POST", `/1/boards/?name=BoardTest&key=SEU_KEY&token=SEU_TOKEN`).then((response) => {
    expect(response.status).to.eq(200);
    boardId = response.body.id;
  });
});

Then("o board deve ser criado com sucesso", () => {
  expect(boardId).to.not.be.undefined;
});

Given("que tenho um board existente", () => {
  cy.request("POST", `/1/boards/?name=BoardDeleteTest&key=SEU_KEY&token=SEU_TOKEN`).then((response) => {
    boardId = response.body.id;
  });
});

When("envio uma requisição para excluí-lo", () => {
  cy.request("DELETE", `/1/boards/${boardId}?key=SEU_KEY&token=SEU_TOKEN`).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("o board deve ser removido com sucesso", () => {
  // Verificação adicional opcional
});

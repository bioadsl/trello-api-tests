import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let boardId, listId, cardId;

Given("que tenho um board e uma lista disponíveis", () => {
  cy.request("POST", `/1/boards/?name=BoardCardTest&key=SEU_KEY&token=SEU_TOKEN`).then((res) => {
    boardId = res.body.id;
    cy.request("GET", `/1/boards/${boardId}/lists?key=SEU_KEY&token=SEU_TOKEN`).then((listRes) => {
      listId = listRes.body[0].id;
    });
  });
});

When("envio uma requisição para criar um card", () => {
  cy.request("POST", `/1/cards?idList=${listId}&name=CardTest&key=SEU_KEY&token=SEU_TOKEN`).then((res) => {
    expect(res.status).to.eq(200);
    cardId = res.body.id;
  });
});

Then("o card deve ser criado com sucesso", () => {
  expect(cardId).to.not.be.undefined;
});

Given("que tenho um card existente", () => {
  cy.request("POST", `/1/boards/?name=BoardCardDel&key=SEU_KEY&token=SEU_TOKEN`).then((res) => {
    boardId = res.body.id;
    cy.request("GET", `/1/boards/${boardId}/lists?key=SEU_KEY&token=SEU_TOKEN`).then((listRes) => {
      listId = listRes.body[0].id;
      cy.request("POST", `/1/cards?idList=${listId}&name=CardDel&key=SEU_KEY&token=SEU_TOKEN`).then((resCard) => {
        cardId = resCard.body.id;
      });
    });
  });
});

When("envio uma requisição para excluí-lo", () => {
  cy.request("DELETE", `/1/cards/${cardId}?key=SEU_KEY&token=SEU_TOKEN`).then((res) => {
    expect(res.status).to.eq(200);
  });
});

Then("o card deve ser removido com sucesso", () => {
  // Verificação adicional opcional
});

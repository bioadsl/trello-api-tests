const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

cy.request({
  method: "POST",
  url: `https://api.trello.com/1/boards/?name=MeuBoard&key=${apiKey}&token=${token}`
}).then((response) => {
  expect(response.status).to.eq(200);
});

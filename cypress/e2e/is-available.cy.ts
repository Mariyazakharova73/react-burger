describe("service is available", function () {
  // it("should be available on localhost:3000", () => {
  //   cy.visit("http://localhost:3000");
  // });

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should get h1", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("check card with ingredient", () => {
    cy.get("[class^=Card_item__]").first().as('card');
    cy.get('@card').click();
    cy.get("[class^=Modal_container__]").as('modal');
    cy.get('@modal').find("h2").contains("Детали ингредиента");
    cy.get('@modal').find("svg").click();
  });





});

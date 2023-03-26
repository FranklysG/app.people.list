describe("User can create new company", () => {
  it("user can create new", () => {
    const company = {
      name: "American Bully Company",
      doc: "24.717.870/0001-81",
      address: "Av. Alameda Jr, São Caetano, Mirante, Goiania - GO",
    };

    cy.visit("http://localhost:3000/dashboard");
    cy.get('[data-cy="button-open-panel-company"]').click();
    cy.get('#name').type(company.name);
    cy.get('#doc').type(company.doc);
    cy.get('#address').type(company.address);
    cy.get('#button-company-confirm-form').click();
  });
});

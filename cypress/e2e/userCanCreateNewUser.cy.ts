describe("User can create new company", () => {
  it("user can create new", () => {
    const user = {
      name: 'Claudio Ferreira Belo',
      email: 'claudio.belo@gmail.com',
      phone: '99984657323',
      birthdate: '1987-03-12',
      city: 'Lajotas - RN'
    };

    cy.visit("http://localhost:3000/dashboard");
    cy.get('[data-cy="button-open-panel-user"]').click();
    cy.get('#name').type(user.name);
    cy.get('#email').type(user.email);
    cy.get('#phone').type(user.phone);
    cy.get('#birthdate').type(user.birthdate);
    cy.get('#city').type(user.city);
    cy.get('#button-user-confirm-form').click();
  });
});

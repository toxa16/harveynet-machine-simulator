describe('Connection', () => {
  it('should connect and disconnect', () => {
    // visit home path
    cy.visit('/');

    // see the connection form
    cy.get('[data-cy="connection-form"]')
      // see the disconnect button disabled
      .find('[data-cy="disconnect-button"]')
      .should('be.disabled');

    // enter a machine id
    cy.get('[data-cy="connection-form"]')
      .find('[name="machine_id"]')
      .type('machine1');

    // submit the form
    cy.get('[data-cy="connection-form"]')
      .submit();

    // see the connect button disabled
    cy.get('[data-cy="connection-form"]')
      .find('[data-cy="connect-button"]')
      .should('be.disabled');

    // see the disconnect button enabled
    cy.get('[data-cy="connection-form"]')
      .find('[data-cy="disconnect-button"]')
      .should('not.be.disabled');

    // see the machine id input disabled
    cy.get('[data-cy="connection-form"]')
      .find('[name="machine_id"]')
      .should('be.disabled');
  });
});

describe('Connection', () => {
  it('should connect and disconnect', () => {
    // visit home path
    cy.visit('/');

    // see the connection form
    cy.get('[data-cy="connection-form"]')
      // see the disconnect button disabled
      .find('[data-cy="disconnect-button"]')
      .should('be.disabled');

    // see connection status "Disconnected"
    cy.get('[data-cy="connection-status"]')
      .contains('Disconnected');

    // CONNECTING
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

    // see connection status "Connected"
    cy.get('[data-cy="connection-status"]')
      .contains('Connected');

    // DISCONNECTING
    // click the disconnect button
    cy.get('[data-cy="connection-form"]')
      .find('[data-cy="disconnect-button"]')
      .click();

    // see the connect button enabled
    cy.get('[data-cy="connection-form"]')
      .find('[data-cy="connect-button"]')
      .should('not.be.disabled');

    // see the disconnect button disabled
    cy.get('[data-cy="connection-form"]')
      .find('[data-cy="disconnect-button"]')
      .should('be.disabled');

    // see the machine id input enabled
    cy.get('[data-cy="connection-form"]')
      .find('[name="machine_id"]')
      .should('not.be.disabled');
    
    // see connection status "Disconnected"
    cy.get('[data-cy="connection-status"]')
      .contains('Disconnected');
  });
});

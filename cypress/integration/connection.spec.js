describe('Connection', () => {
  it('should connect and disconnect', () => {
    cy.visit('/');
    cy.get('[data-cy="connection-form"]');
  });
});

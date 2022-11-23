describe('Navigation', () => {
  it('should navigate to the messages page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/messages')

    // The new url should include "/community"
    cy.url().should('include', '/messages')


  })
})
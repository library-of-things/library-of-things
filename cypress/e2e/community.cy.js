describe('Navigation', () => {
  it('should navigate to the community page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/community')

    // The new url should include "/community"
    cy.url().should('include', '/community')


  })
})
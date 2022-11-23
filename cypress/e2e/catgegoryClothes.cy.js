describe('Navigation', () => {
  it('should navigate to the clothes category page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/community?cat=5')

    // The new url should include "/community"
    cy.url().should('include', '/community?cat=5')


  })
})
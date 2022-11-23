describe('Navigation', () => {
  it('should navigate to the electronic category page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/community?cat=1')

    // The new url should include "/community"
    cy.url().should('include', '/community?cat=1')


  })
})
describe('Navigation', () => {
  it('should navigate to the landing page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // The new url should include "/"
    cy.url().should('include', '/')

    // The new page should contain an h2 with "Landing!!!"
    cy.get('h2').contains('Landing!!!')
  })
})
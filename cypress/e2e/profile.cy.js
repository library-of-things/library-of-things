describe('Navigation', () => {
  it('should navigate to a profile page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/profiles/3e2d3ab6-a523-44b2-87fb-92bda69525bf')

    // The new url should include "/profiles"
    cy.url().should('include', '/profiles/3e2d3ab6-a523-44b2-87fb-92bda69525bf')

  })
})
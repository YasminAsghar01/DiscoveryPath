// testing the main project page features
describe('Main Project Page', () => {
  it('Explore Main Project Page', () => {
    cy.contains("Projects").should("exist").click();
    cy.url().should('include', '/projects')
    cy.get('button').eq(2).click()
    cy.get('#split-button-menu').should('exist');
    cy.get('#split-button-menu').within(() => {
      cy.contains('All Projects').should('be.visible');
      cy.contains('Available Projects').should('be.visible');
      cy.contains('Favourite Projects').should('be.visible').click()
      cy.get('FavoriteBorderOutlinedIcon').should('not.exist');
    });
    cy.get('button').eq(2).click()
    cy.get('#split-button-menu').should('exist');
    cy.get('#split-button-menu').within(() => {
      cy.contains('Available Projects').should('be.visible').click()
    });
    cy.get('button').eq(1).contains("Available Projects")
    cy.get('#search-bar').type('Project D');
    cy.get('.MuiCard-root').should('have.length', 1).within(() => {
        cy.contains("Project D")
        cy.get('button').contains("See Project").click()
    })
    cy.url().should('eq', 'http://localhost:3000/projects/Project%20D')
  })
})

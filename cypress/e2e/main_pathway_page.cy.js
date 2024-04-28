// testing the main pathway page features
describe('Main Pathway Page', () => {
  it('Explore Main Pathway Page', () => {
    cy.contains("Pathways").should("exist").click();
    cy.url().should('include', '/pathways')
    cy.get('button').eq(2).click()
    cy.get('#split-button-menu').should('exist');
    cy.get('#split-button-menu').within(() => {
      cy.contains('All Pathways').should('be.visible');
      cy.contains('Favourite Pathways').should('be.visible')
      cy.contains('Completed Pathways').should('be.visible').click()
    });
    cy.get('.MuiSvgIcon-root').eq(5).should('exist').click();
    cy.get('button').eq(2).click()
    cy.get('#search-bar').type('Pathway A');
    cy.get('.MuiCard-root').should('have.length', 1).within(() => {
        cy.contains("Pathway A")
        cy.get('button').contains("See more detail").click()
    })
    cy.url().should('eq', 'http://localhost:3000/pathways/Pathway%20A')
  })
})

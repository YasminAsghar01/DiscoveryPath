describe('Homepage', () => {
  it('Explore Homepage', () => {
    cy.contains("Welcome Michael Brown").should("exist");
    cy.contains("Suggested Projects").should("exist");
    cy.contains("Suggested Pathways").should("exist");
    cy.get('.MuiPaper-root').contains('Pathway A').get('button').contains('See more detail').click()
    cy.url().should('include', '/pathways/')
    cy.contains('KPMGDiscoveryPath').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

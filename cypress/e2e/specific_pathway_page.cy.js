describe('Specific Pathway Page', () => {
  it('Explore Specific Pathway Page', () => {
    cy.contains('Pathway A').should("exist").parents('.MuiCard-root').find('.MuiButton-root').click();
    cy.url().should('include', '/pathways/')
    cy.get('h2').should('have.length', 5);
    cy.get('ul').within(() => {
      cy.get('a').should('have.length', 5);
      cy.get('a').eq(4).click()
    })
    cy.get('.MuiAvatar-root').eq(1).click()
    cy.url().should('include', '/profiles/')
    cy.go(-1)
    cy.get('a[target="_blank"][href]').click()
    cy.wait(2000)
    cy.window().then((win) => {
      cy.on('window:open', (newWin) => {
        expect(newWin).to.exist;
      });
    });
  })
})



// testing specific project page features
describe('Specific Project Page', () => {
  it('Explore Specific Project Page', () => {
    cy.contains("Projects").should("exist").click();
    cy.url().should('include', '/projects')
    cy.get('#search-bar').type('Project A');
    cy.get('.MuiCard-root').should('have.length', 1).within(() => {
      cy.contains("Project A")
      cy.get('button').contains("See Project").click()
    })
    cy.url().should('eq', 'http://localhost:3000/projects/Project%20A')
    cy.get('h2').should('have.length', 5);
    cy.get('.MuiAvatar-root').eq(1).click()
    cy.url().should('include', '/profiles/')
    cy.go(-1)
    cy.get('ul').within(() => {
      cy.get('a').should('have.length', 5);
      cy.get('a').eq(2).click()
    })
    cy.get('.MuiCard-root').eq(2).should('be.visible').within(() => {
      cy.contains("Pathway A").click()
      cy.url().should('include', '/pathways/')
      cy.go(-1)
    })
    cy.get('.MuiCard-root').eq(0).should('be.visible').within(() => {
      cy.contains("Software Engineer Apprentice")
      cy.get('a').contains("Alice Smith").click()
      cy.wait(2000)
      cy.window().then((win) => {
        cy.on('window:open', (newWin) => {
          expect(newWin).to.exist;
        });
      });
    })
  })
})




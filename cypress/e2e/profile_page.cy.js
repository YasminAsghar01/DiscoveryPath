describe('Profile Page', () => {
  it('Explore Profile Page', () => {
    cy.get('.MuiAvatar-root').eq(0).click()
    cy.contains('Profile').click()
    cy.viewport(1400, 800);
    cy.url().should('include', '/profiles/')
    cy.contains("Michael Brown's Profile").should("exist");
    cy.contains("Contact Details").should("exist");
    cy.contains("Organisation Details").should("exist");
    cy.contains("My Skills").should("exist");
    cy.contains("Project Experience").should("exist");
    cy.get('.addskillbutton').should('exist').click()
    cy.get('.MuiDialog-container').should('be.visible');
    cy.get('input[id="name"]').type('Python').should('have.value', 'Python')
    cy.contains('Beginner').click()
    cy.get('ul').should('be.visible')
    cy.get('li').should('have.length', 3);
    cy.contains('Advanced').should('be.visible').click()
    cy.get('button').contains('Save').click()
    cy.contains('Python').should("exist");
    cy.get('.addprojectbutton').should('exist').click()
    cy.get('.MuiDialog-container').should('be.visible');
    cy.get('input[id="name"]').type('Project Y').should('have.value', 'Project Y')
    cy.get('input[id="date"]').type('2024-03-28').should('have.value', '2024-03-28')
    cy.get('input[id="role"]').type('Tester').should('have.value', 'Tester')
    cy.get('input[id="skills"]').type('Cypress, Python').should('have.value', 'Cypress, Python')
    cy.get('button').contains('Save').click()
    cy.contains('Project Y').should("exist");
  })
})

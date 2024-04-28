//testing features specific to resource manager and project lead
describe('User Specific features', () => {
  it('Explore User Specific features', () => {
    cy.get('.MuiAvatar-root').eq(0).click()
    cy.contains('Log out').click()
    cy.url().should('include', '/login')
    cy.contains('Email Address').type('alice.smith@example.com')
    cy.get('input[id="email"]').should('have.value', 'alice.smith@example.com')
    cy.get('input[id="password"]').type('password123');
    cy.get('input[id="password"]').should('have.value', 'password123')
    cy.get('.login').should('be.visible').should('be.enabled').click({ retry: 3 })
    cy.wait(2000)
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains("Projects").should("exist").click();
    cy.url().should('include', '/projects')
    cy.viewport(1400, 800);
    cy.get('.addskillbutton').should('exist').click() //test creating a project
    cy.get('.MuiDialog-container').should('be.visible');
    cy.get('input[id="name"]').type('Discovery Path').should('have.value', 'Discovery Path')
    cy.get('#description').type('Description for Discovery Path').should('have.value', 'Description for Discovery Path')
    cy.get('input[id="start_date"]').type('2024-03-28').should('have.value', '2024-03-28')
    cy.get('input[id="end_date"]').type('2024-03-29').should('have.value', '2024-03-29')
    cy.get('input[id="project_lead"]').type('1445702').should('have.value', '1445702')
    cy.get('input[id="technologies"]').type('Cypress, Python').should('have.value', 'Cypress, Python')
    cy.get('input[id="team_members"]').type('1445703, 1445701').should('have.value', '1445703, 1445701')
    cy.get('button').contains('Save').click()
    cy.contains('Discovery Path').should("exist").parents('.MuiCard-root').find('.MuiButton-root').click();
    cy.wait(1000)
    cy.get('.addMemberbutton').eq(0).should('exist').click() //test adding a team member
    cy.get('.MuiDialog-container').should('be.visible');
    cy.contains('Add a new team member').should('be.visible');
    cy.get('input').type('Sarah Lee{enter}').should('have.value', 'Sarah Lee')
    cy.get('button').contains('Add').click()
    cy.contains('Sarah Lee').should("exist");
    cy.contains("Pathways").should("exist").click();
    cy.url().should('include', '/pathways')
    cy.get('.addskillbutton').should('exist').click() //test creating a pathway
    cy.get('.MuiDialog-container').should('be.visible');
    cy.get('input[id="name"]').type('AZ-900').should('have.value', 'AZ-900')
    cy.get('#description').type('Description for AZ-900').should('have.value', 'Description for AZ-900')
    cy.get('input[id="pathway_link"]').type('https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/').should('have.value', 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/')
    cy.get('input[id="duration"]').type('3 months').should('have.value', '3 months')
    cy.get('input[id="certification"]').type('AZ-900').should('have.value', 'AZ-900')
    cy.get('input[id="skills_gained"]').type('Cloud, Azure').should('have.value', 'Cloud, Azure')
    cy.get('button').contains('Save').click()
    cy.contains('AZ-900').should("exist");
  })
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

before(() => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', '/login')
    cy.contains('Email Address').type('michael.brown@example.com')
    cy.get('input[id="email"]').should('have.value', 'michael.brown@example.com')
    cy.get('input[id="password"]').type('password1234');
    cy.get('input[id="password"]').should('have.value', 'password1234')
    cy.get('.login').should('be.visible').should('be.enabled').click({ retry: 3 })
    cy.wait(2000)
    cy.url().should('eq', 'http://localhost:3000/');
})


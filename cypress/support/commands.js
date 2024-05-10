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

Cypress.Commands.add('redmine_login', (user) => {
    cy.visit('http://localhost:8080/')
    cy.get('a[href="/login"]').click()
    cy.get('input[id="username"]').type(user.username)
    cy.get('input[id="password"]').type(user.password)
    cy.get('input[id="login-submit"]').click()
})

Cypress.Commands.add('redmine_deleteIssue', () => {
    cy.get('span[title="Actions"]').first().click();
    cy.contains("Delete issue").first().click();
    cy.get('div[id="flash_notice"]').should('exist');
})

Cypress.Commands.add('trac_login', (user) => {
    cy.visit('http://' + user.username + ':' + user.password + '@localhost:8123/');
})

Cypress.Commands.add('tracks_login', (user) => {
    cy.visit('http://localhost:80/')
    cy.get('input[id="user_login"]').type(user.username)
    cy.get('input[id="user_password"]').type(user.password)
    cy.get('input[value="Sign in"]').click()
})
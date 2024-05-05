describe('time tracking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.redmine_login(Cypress.env("redmine_basicUser"))
    cy.visit('http://localhost:8080/time_entries');
    cy.contains("Log time").click();

    
  })

  it.skip('test case no. 2', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 2");

    //project - entered
    cy.get('select[id="time_entry_project_id"]').select('Test Project');

    //issue - entered
    cy.wait(500)
    cy.get('input[id="time_entry_issue_id"]').type('17');

    //date - past
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() - 10)
    cy.get('input[id="time_entry_spent_on"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    cy.get('input[id="time_entry_hours"]').type(10);

    cy.get('input[value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');
    cy.contains(currentDateString + " test case no. 2").should('exist');
  })

  it.skip('test case no. 6', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 6");

    //project - empty

    //issue - entered
    cy.wait(500)
    cy.get('input[id="time_entry_issue_id"]').type('17');

    //date - future
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10)
    cy.get('input[id="time_entry_spent_on"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    cy.get('input[id="time_entry_hours"]').type(10);

    cy.get('input[value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');
    cy.contains(currentDateString + " test case no. 6").should('exist');
  })

  it.skip('test case no. 5', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 5");

    //project - entered
    cy.get('select[id="time_entry_project_id"]').select('Test Project');

    //issue - empty

    //date - future
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10)
    cy.get('input[id="time_entry_spent_on"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    cy.get('input[id="time_entry_hours"]').type(10);

    cy.get('input[value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');
    cy.contains(currentDateString + " test case no. 5").should('exist');
  })

  it.skip('test case no. 8', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 8");

    //project - entered
    cy.get('select[id="time_entry_project_id"]').select('Test Project');

    //issue - empty

    //date - now
    cy.get('input[id="time_entry_spent_on"]').invoke('val', currentDate.toISOString().split('T')[0]).trigger('input');

    //hours - invalid
    cy.get('input[id="time_entry_hours"]').type(-10);

    cy.get('input[value="Create"]').click();

    cy.contains("Hours is invalid").should('exist');
  })

  it('test case no. 1', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 1");

    //project - empty

    //issue - empty

    //date - past
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() - 10)
    cy.get('input[id="time_entry_spent_on"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    cy.get('input[id="time_entry_hours"]').type(10);

    cy.get('input[value="Create"]').click();

    cy.contains("Project cannot be blank").should('exist');
    cy.contains("Project is invalid").should('exist');
  })

})

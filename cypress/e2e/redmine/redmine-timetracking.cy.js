describe('time tracking', () => {
  beforeEach(() => {
    cy.redmine_login(Cypress.env("redmine_basicUser"))
    cy.visit('http://localhost:8080/time_entries');
    cy.contains("Log time").click();

    
  })

  it('test case no. 3', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //3			Entered	Entered	Past	StringInvalid
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 3");

    //project - entered
    const project = 'Test Project'
    cy.get('select[id="time_entry_project_id"]').select(project);

    //issue - entered
    cy.wait(500)
    cy.get('input[id="time_entry_issue_id"]').type('13');

    //date - past
    const date = new Date()
    date.setDate(currentDate.getDate() - 10)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    cy.get('input[id="time_entry_spent_on"]').invoke('val', date.toISOString().split('T')[0]).trigger('input');

    //hours - stringInvalid
    const hours = "ten"
    cy.get('input[id="time_entry_hours"]').type(hours);

    cy.get('input[value="Create"]').click();

    cy.contains("Hours is invalid").should('exist');
  })

  it.skip('test case no. 1', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //1			Empty	Entered	Past	Valid
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 1");

    //project - empty

    //issue - entered
    cy.wait(500)
    cy.get('input[id="time_entry_issue_id"]').type('13');

    //date - past
    const date = new Date()
    date.setDate(currentDate.getDate() - 10)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    cy.get('input[id="time_entry_spent_on"]').invoke('val', date.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    const hours = 10
    cy.get('input[id="time_entry_hours"]').type(hours);

    cy.get('input[value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');
    cy.contains(currentDateString + " test case no. 1").should('exist');
    cy.contains(currentDateString + " test case no. 1").parent().contains(hours + ":00").should('exist')
    cy.contains(formattedDate).should('exist')
  })

  it.skip('test case no. 7', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //7			Entered	Entered	Future	Valid
    
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 7");

    //project - entered
    const project = 'Test Project'
    cy.get('select[id="time_entry_project_id"]').select(project);

    //issue - entered
    cy.wait(500)
    cy.get('input[id="time_entry_issue_id"]').type('13');

    //date - future
    const date = new Date()
    date.setDate(currentDate.getDate() + 10)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    cy.get('input[id="time_entry_spent_on"]').invoke('val', date.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    const hours = 10
    cy.get('input[id="time_entry_hours"]').type(hours);

    cy.get('input[value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');

    cy.contains(currentDateString + " test case no. 7").should('exist');
    cy.contains(currentDateString + " test case no. 7").parent().contains(hours + ":00").should('exist')
    cy.contains(formattedDate).should('exist')
  })

  it.skip('test case no. 2', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //2			Entered	Empty	Past	Invalid
    
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 2");

    //project - entered
    const project = 'Test Project'
    cy.get('select[id="time_entry_project_id"]').select(project);

    //issue - empty

    //date - past
    const date = new Date()
    date.setDate(currentDate.getDate())
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    cy.get('input[id="time_entry_spent_on"]').invoke('val', date.toISOString().split('T')[0]).trigger('input');

    //hours - invalid
    const hours = -10
    cy.get('input[id="time_entry_hours"]').type(hours);

    cy.get('input[value="Create"]').click();

    cy.contains("Hours is invalid").should('exist');
  })

  it.skip('test case no. 4', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //4			Empty	Empty	Now	Valid
    cy.get('input[id="time_entry_comments"]').type(currentDateString + " test case no. 4");

    //project - empty

    //issue - empty

    //date - now
    const date = new Date()
    date.setDate(currentDate.getDate())
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    cy.get('input[id="time_entry_spent_on"]').invoke('val', date.toISOString().split('T')[0]).trigger('input');

    //hours - valid
    const hours = 10
    cy.get('input[id="time_entry_hours"]').type(hours);

    cy.get('input[value="Create"]').click();

    cy.contains("Project cannot be blank").should('exist');
    cy.contains("Project is invalid").should('exist');
  })

})

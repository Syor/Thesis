describe('issues', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.redmine_login(Cypress.env("redmine_basicUser"))
    cy.visit('http://localhost:8080/projects/test-project/issues');
    cy.xpath('//div[@id="content"]/div/a').click()
  })

  it.skip('test case no. 2', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //subject - Valid
    cy.get('input[id="issue_subject"]').type("TestCaseNum2 " + currentDateString);

    //assignee - Me
    cy.get('a[data-id="5"]').click();

    //category - Any
    cy.get('select[id="issue_category_id"]').select('AnyCategory');

    //Target version - New

    /*cy.get('a[title="New version"]').click();
    cy.get('input[id="version_name"]').type("1.0 " + currentDateString);
    cy.xpath('//p/input[@value="Create"]').click();*/

    //file - Chosen
    cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');

    //parent task - Chosen
    cy.wait(500)
    cy.get('input[id="issue_parent_issue_id"]').type('17');

    //start date - future
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10)
    cy.get('input[id="issue_start_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //end date - not inserted

    //estimated time - empty

    cy.xpath('//form/input[@value="Create"]').click();


    cy.get('div[id="flash_notice"]').should('exist');

    if (Cypress.env("cleanup")) {
      cy.redmine_deleteIssue();
    }
  })


  it.skip('test case no. 11', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //subject - Valid
    cy.get('input[id="issue_subject"]').type("TestCaseNum11 " + currentDateString);

    //assignee - Other
    cy.get('select[id="issue_assigned_to_id"]').select('Other Assignee');

    //category - Any
    cy.get('select[id="issue_category_id"]').select('AnyCategory');

    //Target version - New

    /*cy.get('a[title="New version"]').click();
    cy.get('input[id="version_name"]').type("1.0 " + currentDateString);
    cy.xpath('//p/input[@value="Create"]').click();*/

    //file - Chosen
    cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');

    //parent task - not chosen

    //start date - future
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10)
    cy.get('input[id="issue_start_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //end date - more than start
    futureDate.setDate(futureDate.getDate() + 10)
    cy.get('input[id="issue_due_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - valid
    cy.get('input[id="issue_estimated_hours"]').type(10);


    cy.xpath('//form/input[@value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');

    if (Cypress.env("cleanup")) {
      cy.redmine_deleteIssue();
    }
  })

  it.skip('test case no. 16', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //subject - Invalid

    //assignee - Empty

    //category - Any
    cy.get('select[id="issue_category_id"]').select('AnyCategory');

    //Target version - Any (default)


    //file - not chosen

    //parent task - not chosen

    //start date - current (default)

    //end date - less than start
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() - 10)
    cy.get('input[id="issue_due_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - Empty

    cy.xpath('//form/input[@value="Create"]').click();

    cy.contains("Subject cannot be blank").should('exist');
    cy.contains("Due date must be greater than start date").should('exist');
  })

  it.skip('test case no. 20', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //subject - Valid
    cy.get('input[id="issue_subject"]').type("TestCaseNum20 " + currentDateString);

    //assignee - Empty (default)

    //category - Any
    cy.get('select[id="issue_category_id"]').select('AnyCategory');

    //Target version - Any (default)

    //file - Chosen
    cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');

    //parent task - Chosen
    cy.wait(500)
    cy.get('input[id="issue_parent_issue_id"]').type('17');

    //start date - current(default)


    //end date - less than start
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() - 10)
    cy.get('input[id="issue_due_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - invalid
    cy.get('input[id="issue_estimated_hours"]').type("-10");


    cy.xpath('//form/input[@value="Create"]').click();

    cy.contains("Estimated time is invalid").should('exist');
    cy.contains("Due date must be greater than start date").should('exist');
  })

  it('test case no. 3', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //subject - Valid
    cy.get('input[id="issue_subject"]').type("TestCaseNum3 " + currentDateString);

    //assignee - Me
    cy.get('a[data-id="5"]').click();

    //category - Any
    cy.get('a[title="New category"]').click();
    cy.get('input[id="issue_category_name"]').type("Category " + currentDateString);
    cy.xpath('//p/input[@value="Create"]').click();

    //Target version - empty

    //file - Not chosen

    //parent task - Chosen
    cy.wait(500)
    cy.get('input[id="issue_parent_issue_id"]').type('17');

    //start date - past
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() - 10)
    cy.get('input[id="issue_start_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //end date -more than start
    futureDate.setDate(futureDate.getDate() + 10)
    cy.get('input[id="issue_due_date"]').invoke('val', futureDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - valid
    cy.get('input[id="issue_estimated_hours"]').type("10");

    cy.xpath('//form/input[@value="Create"]').click();


    cy.get('div[id="flash_notice"]').should('exist');

    if (Cypress.env("cleanup")) {
      cy.redmine_deleteIssue();
    }
  })
})

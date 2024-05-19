describe('issues', () => {
  beforeEach(() => {
    cy.redmine_login(Cypress.env("redmine_basicUser"))
    cy.visit('http://localhost:8080/projects/test-project/issues');
    cy.xpath('//div[@id="content"]/div/a').click()
  })

  it('test case no. 4', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //4				Valid	Me	New	Empty	NotChosen	Chosen	Current	NotInserted	Valid
    //subject - Valid
    const subject = "TestCaseNum4 " + currentDateString;
    cy.get('input[id="issue_subject"]').type(subject);

    //assignee - Me
    cy.get('a[data-id="5"]').click();

    //category - new
    const category = "Category " + currentDateString
    cy.get('a[title="New category"]').click();
    cy.get('input[id="issue_category_name"]').type(category);
    cy.xpath('//p/input[@value="Create"]').click();

    //Target version - empty

    //file - not chosen

    //parent task - Chosen
    //sadly this is the only reliable way to do it
    cy.wait(500)
    cy.get('input[id="issue_parent_issue_id"]').type('1');

    //start date - current
    const startDate = new Date();
    startDate.setDate(currentDate.getDate())
    const dayStart = startDate.getDate().toString().padStart(2, '0');
    const monthStart = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const yearStart = startDate.getFullYear();
    const formattedStartDate = `${monthStart}/${dayStart}/${yearStart}`;

    cy.get('input[id="issue_start_date"]').invoke('val', startDate.toISOString().split('T')[0]).trigger('input');

    //end date - not inserted

    //estimated time - valid
    const estimatedTime = 10;
    cy.get('input[id="issue_estimated_hours"]').type(estimatedTime);


    cy.xpath('//form/input[@value="Create"]').click();


    cy.get('div[id="flash_notice"]').should('exist');

    cy.contains(subject).should('exist')
    
    cy.contains('Basic Assignee').should('exist')

    cy.contains(category).should('exist')

    cy.contains('ParentIssue').should('exist')

    cy.contains(formattedStartDate).should('exist')

    cy.contains(estimatedTime).should('exist')
  })


  it('test case no. 2', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //2				Valid	Empty	New	New	Chosen	Chosen	Future	NotInserted	Empty
    //subject - Valid
    const subject = "TestCaseNum2 " + currentDateString
    cy.get('input[id="issue_subject"]').type(subject);

    //assignee - empty

    //category - new  
    const category = "Category " + currentDateString
    cy.get('a[title="New category"]').click();
    cy.get('input[id="issue_category_name"]').type(category);
    cy.xpath('//p/input[@value="Create"]').click();

    //Target version - New
    const version = "1.1 " + currentDateString
    cy.get('a[title="New version"]').click();
    cy.get('input[id="version_name"]').type(version);
    cy.xpath('//p/input[@value="Create"]').click();

    //file - Chosen
    cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');

    //parent task - Chosen
    //sadly this is the only reliable way to do it
    cy.wait(500)
    cy.get('input[id="issue_parent_issue_id"]').type('1');

    //start date - future
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() + 10)
    const dayStart = startDate.getDate().toString().padStart(2, '0');
    const monthStart = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const yearStart = startDate.getFullYear();
    const formattedStartDate = `${monthStart}/${dayStart}/${yearStart}`;

    cy.get('input[id="issue_start_date"]').invoke('val', startDate.toISOString().split('T')[0]).trigger('input');;

    //end date - not inserted

    //estimated time - empty


    cy.xpath('//form/input[@value="Create"]').click();

    cy.get('div[id="flash_notice"]').should('exist');

    cy.contains(subject).should('exist')
    
    cy.contains('Basic Assignee').should('exist')

    cy.contains(category).should('exist')

    cy.contains(version).should('exist')

    cy.contains('SampleFile.txt').should('exist')

    cy.contains(formattedStartDate).should('exist')
  })

  it('test case no. 1', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //1				Invalid	Me	Any	Any	NotChosen	NotChosen	Current	LessThenStart	Empty

    //subject - Invalid

    //assignee - Me
    cy.get('a[data-id="5"]').click();

    //category - Any
    const category = "AnyCategory"
    cy.get('select[id="issue_category_id"]').select(category);

    //Target version - Any (default)


    //file - not chosen

    //parent task - not chosen

    //start date - current (default)

    //end date - less than start
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() - 10)
    const dayEnd = endDate.getDate().toString().padStart(2, '0');
    const monthEnd = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const yearEnd = endDate.getFullYear();
    const formattedEndDate = `${monthEnd}/${dayEnd}/${yearEnd}`;
    cy.get('input[id="issue_due_date"]').invoke('val', endDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - Empty

    cy.xpath('//form/input[@value="Create"]').click();

    cy.contains("Subject cannot be blank").should('exist');
    cy.contains("Due date must be greater than start date").should('exist');
  })

  it('test case no. 14', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //14				Valid	Empty	New	New	NotChosen	NotChosen	Current	LessThenStart	Valid

    //subject - Valid
    const subject = "TestCaseNum14 " + currentDateString
    cy.get('input[id="issue_subject"]').type(subject);

    //assignee - Empty (default)

    //category - new  
    const category = "Category " + currentDateString
    cy.get('a[title="New category"]').click();
    cy.get('input[id="issue_category_name"]').type(category);
    cy.xpath('//p/input[@value="Create"]').click();

    //Target version - New
    const version = "1.1 " + currentDateString
    cy.get('a[title="New version"]').click();
    cy.get('input[id="version_name"]').type(version);
    cy.xpath('//p/input[@value="Create"]').click();

    //file - not chosen

    //parent task - not chosen

    //start date - current(default)


    //end date - less than start
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() - 10)
    const dayEnd = endDate.getDate().toString().padStart(2, '0');
    const monthEnd = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const yearEnd = endDate.getFullYear();
    const formattedEndDate = `${monthEnd}/${dayEnd}/${yearEnd}`;
    cy.get('input[id="issue_due_date"]').invoke('val', endDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - valid
    const estimatedTime = 10
    cy.get('input[id="issue_estimated_hours"]').type(estimatedTime);


    cy.xpath('//form/input[@value="Create"]').click();

    cy.contains("Due date must be greater than start date").should('exist');
  })

  it('test case no. 7', () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
    //7				Valid	Me	Empty	New	Chosen	NotChosen	Current	MoreThenStart	Invalid
    
    //subject - Valid
    const subject = "TestCaseNum7 " + currentDateString;
    cy.get('input[id="issue_subject"]').type(subject);

    //assignee - Me
    cy.get('a[data-id="5"]').click();

    //category - empty

    //Target version - New
    const version = "1.1 " + currentDateString
    cy.get('a[title="New version"]').click();
    cy.get('input[id="version_name"]').type(version);
    cy.xpath('//p/input[@value="Create"]').click();

    //file - Chosen
    cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');

    //parent task - not chosen

    //start date - current (default)

    ///end date - more than start
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 10)
    const dayEnd = endDate.getDate().toString().padStart(2, '0');
    const monthEnd = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const yearEnd = endDate.getFullYear();
    const formattedEndDate = `${monthEnd}/${dayEnd}/${yearEnd}`;
    cy.get('input[id="issue_due_date"]').invoke('val', endDate.toISOString().split('T')[0]).trigger('input');

    //estimated time - invalid
    const estimatedTime = -10;
    cy.get('input[id="issue_estimated_hours"]').type(estimatedTime);



    cy.xpath('//form/input[@value="Create"]').click();

    cy.contains('Estimated time is invalid').should('exist')
  })
})

describe("newAction", () => {
    beforeEach(() => {
        cy.tracks_login(Cypress.env("tracks_basicUser"))
        cy.visit('http://localhost/preferences')
        cy.get('a[id="ui-id-4"]').click()
    })

    it('test case n. 1', () => {
        //1	DueIn	FALSE	FALSE	FALSE	FALSE	Positive

        const due = 'Due in ___ days'
        cy.get('select[id="prefs_due_style"]').select(due)

        //ShowCompletedProjects	false
        cy.get('select[id="prefs_show_completed_projects_in_sidebar"]').select('false')

        //ShowHiddenProjects false
        cy.get('select[id="prefs_show_hidden_projects_in_sidebar"]').select('false')

        //ShowHiddenContexts false
        cy.get('select[id="prefs_show_hidden_contexts_in_sidebar"]').select('false')

        //GoToProject false
        cy.get('select[id="prefs_show_project_on_todo_done"]').select('false')

        //ShowNumberOfCompleted positive
        const NumberOfCompleted = 5
        cy.get('input[id="prefs_show_number_completed"]').clear().type(NumberOfCompleted)

        cy.get('button[id="prefs_submit"]').click()


        cy.visit('http://localhost/')
        cy.contains('Hidden context').should('not.exist');
        cy.contains('Hidden projects').should('not.exist');
        cy.contains('Completed projects').should('not.exist');
        //+1 because there is a extra element
        cy.get('div[id="completed_container_items"]').children().should('have.length.lte', NumberOfCompleted + 1);

        
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        const description = "TestCaseConf1 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);
        cy.get('input[id="todo_project_name"]').type("ActiveProject")
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() + 6)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        cy.get('button[id="todo_new_action_submit"]').click();

        cy.contains(description).parent().parent().as('action');

        cy.get('@action').contains('Due in').should('exist')

        cy.get('@action').find('input[class="item-checkbox"]').click()
        cy.url().should('eq', 'http://localhost/')
    })

    it('test case n. 3', () => {
        //3	DueIn	TRUE	FALSE	TRUE	FALSE	Zero

        const due = 'Due in ___ days'
        cy.get('select[id="prefs_due_style"]').select(due)

        //ShowCompletedProjects	true
        cy.get('select[id="prefs_show_completed_projects_in_sidebar"]').select('true')

        //ShowHiddenProjects false
        cy.get('select[id="prefs_show_hidden_projects_in_sidebar"]').select('false')

        //ShowHiddenContexts true
        cy.get('select[id="prefs_show_hidden_contexts_in_sidebar"]').select('true')

        //GoToProject false
        cy.get('select[id="prefs_show_project_on_todo_done"]').select('false')

        //ShowNumberOfCompleted positive
        const NumberOfCompleted = 0
        cy.get('input[id="prefs_show_number_completed"]').clear().type(NumberOfCompleted)

        cy.get('button[id="prefs_submit"]').click()


        cy.visit('http://localhost/')
        cy.contains('Hidden context').should('exist');
        cy.contains('Hidden projects').should('not.exist');
        cy.contains('Completed projects').should('exist');
        //+1 because there is a extra element
        cy.get('div[id="completed_container_items"]').should('not.exist')

        
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        const description = "TestCaseConf3 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);
        cy.get('input[id="todo_project_name"]').type("ActiveProject")
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() + 6)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        cy.get('button[id="todo_new_action_submit"]').click();

        cy.contains(description).parent().parent().as('action');

        cy.get('@action').contains('Due in').should('exist')

        cy.get('@action').find('input[class="item-checkbox"]').click()
        cy.url().should('eq', 'http://localhost/')
    })

    it('test case n. 4', () => {
        //4	DueOn	FALSE	TRUE	FALSE	TRUE	Zero

        const due = 'Due on _______'
        cy.get('select[id="prefs_due_style"]').select(due)

        //ShowCompletedProjects	true
        cy.get('select[id="prefs_show_completed_projects_in_sidebar"]').select('false')

        //ShowHiddenProjects false
        cy.get('select[id="prefs_show_hidden_projects_in_sidebar"]').select('true')

        //ShowHiddenContexts true
        cy.get('select[id="prefs_show_hidden_contexts_in_sidebar"]').select('false')

        //GoToProject false
        cy.get('select[id="prefs_show_project_on_todo_done"]').select('true')

        //ShowNumberOfCompleted positive
        const NumberOfCompleted = 0
        cy.get('input[id="prefs_show_number_completed"]').clear().type(NumberOfCompleted)

        cy.get('button[id="prefs_submit"]').click()


        cy.visit('http://localhost/')
        cy.contains('Hidden context').should('not.exist');
        cy.contains('Hidden projects').should('exist');
        cy.contains('Completed projects').should('not.exist');
        //+1 because there is a extra element
        cy.get('div[id="completed_container_items"]').should('not.exist')

        
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        const description = "TestCaseConf4 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);
        cy.get('input[id="todo_project_name"]').type("ActiveProject")
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() + 6)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        cy.get('button[id="todo_new_action_submit"]').click();

        cy.contains(description).parent().parent().as('action');

        cy.get('@action').contains('Due on').should('exist')

        cy.get('@action').find('input[class="item-checkbox"]').click()
        cy.url().should('not.eq', 'http://localhost/')
    })

    it('test case n. 6', () => {
        //6	DueOn	FALSE	FALSE	TRUE	TRUE	Negative

        const due = 'Due on _______'
        cy.get('select[id="prefs_due_style"]').select(due)

        //ShowCompletedProjects	false
        cy.get('select[id="prefs_show_completed_projects_in_sidebar"]').select('false')

        //ShowHiddenProjects false
        cy.get('select[id="prefs_show_hidden_projects_in_sidebar"]').select('false')

        //ShowHiddenContexts true
        cy.get('select[id="prefs_show_hidden_contexts_in_sidebar"]').select('true')

        //GoToProject true
        cy.get('select[id="prefs_show_project_on_todo_done"]').select('true')

        //ShowNumberOfCompleted negative
        const NumberOfCompleted = -5
        cy.get('input[id="prefs_show_number_completed"]').clear().type(NumberOfCompleted)

        cy.get('button[id="prefs_submit"]').click()

        //here some alert that negative number is not permitted, but it was not
        //havent found anything in documentation, probably will submit a new issue on git

    })

    it('test case n. 8', () => {
        //8	DueOn	FALSE	FALSE	TRUE	FALSE	Invalid

        const due = 'Due on _______'
        cy.get('select[id="prefs_due_style"]').select(due)

        //ShowCompletedProjects	false
        cy.get('select[id="prefs_show_completed_projects_in_sidebar"]').select('false')

        //ShowHiddenProjects false
        cy.get('select[id="prefs_show_hidden_projects_in_sidebar"]').select('false')

        //ShowHiddenContexts true
        cy.get('select[id="prefs_show_hidden_contexts_in_sidebar"]').select('true')

        //GoToProject false
        cy.get('select[id="prefs_show_project_on_todo_done"]').select('false')

        //ShowNumberOfCompleted invalid
        const NumberOfCompleted = "abc"
        cy.get('input[id="prefs_show_number_completed"]').clear().type(NumberOfCompleted)

        cy.get('button[id="prefs_submit"]').click()

        //here some alert that a invalid value was set into a integer only field
        //havent found anything in documentation, probably will submit a new issue on git

    })


})
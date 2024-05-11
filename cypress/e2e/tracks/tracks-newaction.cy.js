describe("newAction", () => {
    beforeEach(() => {
        cy.tracks_login(Cypress.env("tracks_basicUser"))
    })

    it('test case no. 6', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //6	Valid	Empty	HiddenProject	HiddenContext	MultipleTags	Today	Empty	Valid
        //description valid
        const description = "TestCase6 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);

        //notes empty

        //project HiddenProject
        const project = "HiddenProject"
        cy.get('input[id="todo_project_name"]').type(project)

        //context HiddenContext
        const context = "HiddenContext"
        cy.get('input[id="todo_context_name"]').clear().type(context)

        //tags multiple
        const tags = "tag1, tag2"
        cy.get('input[id="tag_list"]').type(tags)

        //duedate Today
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate())
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        //showfrom empty

        
        //dependsOn Valid
        const dependsOn = "Dependent"
        cy.get('input[id="predecessor_input"]').type(dependsOn)
        //sadly, this has to be done manually
        const dependsOnFull = "\'Dependent\' <\'ActiveContext\'\; \'ActiveProject\'>"
        cy.xpath('//*[contains(text(), "' + dependsOnFull + '")]').click()


        cy.get('button[id="todo_new_action_submit"]').click();


        //--evaluation--

        cy.visit('http://localhost/search')
        cy.get('input[id="search"]').type(description)
        cy.xpath('//*[@id="search-form"]/input[2]').click()

        cy.contains(description).should('exist')

        cy.contains("Due Today").should('exist')

        cy.contains('tag1').should('exist')
        cy.contains('tag2').should('exist')

        cy.get('a[title="View project: ' + project +  '"]').should('exist')
        cy.get('a[title="View context: ' + context +  '"]').should('exist')

        cy.get('img[class="edit_item"]').click()

        cy.contains(dependsOnFull).should('exist')


    })
})
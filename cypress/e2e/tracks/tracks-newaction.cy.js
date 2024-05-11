describe("newAction", () => {
    beforeEach(() => {
        cy.tracks_login(Cypress.env("tracks_basicUser"))
    })

    it.skip('test case no. 6', () => {
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

    it.skip('test case no. 1', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //1	Empty	NonEmpty	Empty	HiddenContext	OneTag	Past	Future	Valid
        //description empty

        //notes Nonempty
        const notes = "Some testing notes"
        cy.get('textarea[id="todo_notes"]').type(notes)

        //project empty

        //context HiddenContext
        const context = "HiddenContext"
        cy.get('input[id="todo_context_name"]').clear().type(context)

        //tags oneTag
        const tags = "tag1"
        cy.get('input[id="tag_list"]').type(tags)

        //duedate past
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() - 10)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        //showfrom future
        const showDate = new Date()
        dueDate.setDate(currentDate.getDate() + 10)
        const dayShow = showDate.getDate().toString().padStart(2, '0');
        const monthShow = (showDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearShow = showDate.getFullYear();
        const formattedShowDate = `${dayShow}/${monthShow}/${yearShow}`;
        cy.get('input[id="todo_show_from"]').type(formattedShowDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        
        //dependsOn Valid
        const dependsOn = "Dependent"
        cy.get('input[id="predecessor_input"]').type(dependsOn)
        //sadly, this has to be done manually
        const dependsOnFull = "\'Dependent\' <\'ActiveContext\'\; \'ActiveProject\'>"
        cy.xpath('//*[contains(text(), "' + dependsOnFull + '")]').click()


        cy.get('button[id="todo_new_action_submit"]').click();


        //--evaluation--

        //invalid description
        cy.contains('Description can\'t be blank').should('exist')



    })

    it.skip('test case no. 13', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //13	Valid	NonEmpty	Empty	HiddenContext	OneTag	Future	Empty	Empty
        //description valid
        const description = "TestCase13 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);

        //notes nonempty
        const notes = "Nonempty notes"
        cy.get('textarea[id="todo_notes"]').type(notes)

        //project empty

        //context HiddenContext
        const context = "HiddenContext"
        cy.get('input[id="todo_context_name"]').clear().type(context)

        //tags mone tag
        const tags = "tag1"
        cy.get('input[id="tag_list"]').type(tags)

        //duedate Future
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() + 10)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        //showfrom empty

        
        //dependsOn empty


        cy.get('button[id="todo_new_action_submit"]').click();


        //--evaluation--

        cy.visit('http://localhost/search')
        cy.get('input[id="search"]').type(description)
        cy.xpath('//*[@id="search-form"]/input[2]').click()

        cy.contains(description).should('exist')

        cy.contains("Due in 10 days").should('exist')

        cy.contains('tag1').should('exist')

        cy.get('a[title="View context: ' + context +  '"]').should('exist')

        cy.xpath('//div/a[3]/img').click()
        cy.contains(notes).should('exist')

    })

    it.skip('test case no. 14', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //14	Empty	Empty	ActiveProject	ClosedContext	MultipleTags	Future	Future	Valid
        //description empty

        //notes empty

        //project ActiveProject
        const project = "ActiveProject"
        cy.get('input[id="todo_project_name"]').type(project)

        //context HiddenContext
        const context = "ClosedContext"
        cy.get('input[id="todo_context_name"]').clear().type(context)

        //tags multiple tags
        const tags = "tag1, tag2"
        cy.get('input[id="tag_list"]').type(tags)

        //duedate future
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() + 10)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        //showfrom future
        const showDate = new Date()
        dueDate.setDate(currentDate.getDate() - 10)
        const dayShow = showDate.getDate().toString().padStart(2, '0');
        const monthShow = (showDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearShow = showDate.getFullYear();
        const formattedShowDate = `${dayShow}/${monthShow}/${yearShow}`;
        cy.get('input[id="todo_show_from"]').type(formattedShowDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        
        //dependsOn Valid
        const dependsOn = "Dependent"
        cy.get('input[id="predecessor_input"]').type(dependsOn)
        //sadly, this has to be done manually
        const dependsOnFull = "\'Dependent\' <\'ActiveContext\'\; \'ActiveProject\'>"
        cy.xpath('//*[contains(text(), "' + dependsOnFull + '")]').click()


        cy.get('button[id="todo_new_action_submit"]').click();


        //--evaluation--

        //invalid description
        cy.contains('Description can\'t be blank').should('exist')

    })

    it('test case no. 2', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //12	Valid	Empty	ActiveProject	ClosedContext	MultipleTags	Past	Invalid	Invalid
        //description valid
        const description = "TestCase2 " + currentDateString
        cy.get('input[id="todo_description"]').type(description);

        //notes empty

        //project ActiveProject
        const project = "ActiveProject"
        cy.get('input[id="todo_project_name"]').type(project)

        //context ClosedContext
        const context = "ClosedContext"
        cy.get('input[id="todo_context_name"]').clear().type(context)

        //tags multiple
        const tags = "tag1, tag2"
        cy.get('input[id="tag_list"]').type(tags)

        //duedate Past
        const dueDate = new Date()
        dueDate.setDate(currentDate.getDate() - 10)
        const dayDue = dueDate.getDate().toString().padStart(2, '0');
        const monthDue = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearDue = dueDate.getFullYear();
        const formatteddueDate = `${dayDue}/${monthDue}/${yearDue}`;
        cy.get('input[id="todo_due"]').type(formatteddueDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        //showfrom invalid
        //showfrom must be in future
        const showDate = new Date()
        dueDate.setDate(currentDate.getDate())
        const dayShow = showDate.getDate().toString().padStart(2, '0');
        const monthShow = (showDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const yearShow = showDate.getFullYear();
        const formattedShowDate = `${dayShow}/${monthShow}/${yearShow}`;
        cy.get('input[id="todo_show_from"]').type(formattedShowDate)
        cy.xpath('//*[@id="ui-datepicker-div"]/div[2]/button[2]').click()

        
        //dependsOn Invalid
        const dependsOn = "NonexistentAction"
        cy.get('input[id="predecessor_input"]').type(dependsOn)


        cy.get('button[id="todo_new_action_submit"]').click();


        //--evaluation--

        cy.contains('Show from must be a date in the future').should('exist')

    })
})
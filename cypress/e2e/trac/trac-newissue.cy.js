describe("newIssue" , () => {
    beforeEach(() => {
        cy.trac_login(Cypress.env("trac_basicUser"))
        cy.get('a[href="/newticket"]').click();
    })

    it('testcase4', () => {
        
        //4	Valid	Default	NonEmpty	Task	WithoutDueDate	PastVersion	blocker	component1	FALSE	Empty	NonEmpty	Other  Low
        //summary valid
        const summary = "TestCase4 " + currentDateString
        cy.get('input[id="field-summary"]').type(summary);

        //reporter default

        //description nonempty
        const description = "description";
        cy.get('textarea[id="field-description"]').type(description);

        //type task
        const type = "task";
        cy.get('select[id="field-type"]').select(type);

        //milestone WithoutDueDate
        const milestone = "milestone1";
        cy.get('select[id="field-milestone"]').select(milestone);

        //version PastVersion
        const version = "1.1past";
        cy.get('select[id="field-version"]').select(version);

        //priority blocker
        const priority = "blocker";
        cy.get('select[id="field-priority"]').select(priority);

        //component component1
        const component = "component1";
        cy.get('select[id="field-component"]').select(component);

        //keywords empty

        //cc nonempty
        const cc = "any_cc";
        cy.get('input[id="field-cc"]').type(cc);

        //owner other
        const owner = "any_owner"
        cy.get('input[id="field-owner"]').clear().type(owner);

        //severity Low
        const severity = "Low";
        cy.get('select[id="field-severity"]').select(severity);

        //fileattached false




        cy.get('input[value="Create ticket"]').click();
        //--evaluation--

        //summary exists
        cy.contains(summary).should('exist');

        //reporter default
        cy.get('td[headers="h_reporter"]').find('a').contains('trac_admin').should('exist');

        //owner other
        cy.get('td[headers="h_owner"]').find('a').contains(owner).should('exist');

        //priority blocker
        cy.get('td[headers="h_priority"]').find('a').contains(priority).should('exist');

        //milestone WithoutDueDate
        cy.get('td[headers="h_milestone"]').find('a').contains(milestone).should('exist');

        //component component1
        cy.get('td[headers="h_component"]').find('a').contains(component).should('exist');

        //version PastVersion
        cy.get('td[headers="h_version"]').find('a').contains(version).should('exist');

        //severity Low
        cy.get('td[headers="h_severity"]').find('a').contains(severity).should('exist');

        //keywords empty


        //cc nonempty
        cy.get('td[headers="h_cc"]').find('a').contains(cc).should('exist');

        //description nonempty
        cy.xpath('//div[@class="searchable"]/p').contains(description).should('exist');

        //type task
        cy.get('span[class="trac-type"]').find('a').contains(type).should('exist');
    })

    it('testcase1', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //1	Empty	Default	NonEmpty	Enhancement	WithDueDatePast	PastVersion	major	component2	FALSE	NonEmpty	NonEmpty	Empty	High
        
        //summary empty

        //reporter default

        //description nonempty
        const description = "description";
        cy.get('textarea[id="field-description"]').type(description);

        //type enhancement
        const type = "enhancement";
        cy.get('select[id="field-type"]').select(type);

        //milestone WithDueDatePast
        const milestone = "milestoneCompleted";
        cy.get('select[id="field-milestone"]').select(milestone);

        //version PastVersion
        const version = "1.1past";
        cy.get('select[id="field-version"]').select(version);

        //priority major
        const priority = "major";
        cy.get('select[id="field-priority"]').select(priority);

        //component component2
        const component = "component2";
        cy.get('select[id="field-component"]').select(component);

        //keywords nonempty
        const keywords = "keyword1 keyword2"
        cy.get('input[id="field-keywords"]').type(keywords);

        //cc nonempty
        const cc = "any_cc";
        cy.get('input[id="field-cc"]').type(cc);

        //owner empty
        cy.get('input[id="field-owner"]').clear();

        //severity High
        const severity = "High";
        cy.get('select[id="field-severity"]').select(severity);

        //fileattached false




        cy.get('input[value="Create ticket"]').click();
        //--evaluation--

        cy.get('div[id="warning"]').should('exist');
        cy.contains("Tickets must contain a summary.").should('exist');
    })

    it('testcase7', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //7	Valid	Default	Empty	Defect	WithDueDateFuture	PastVersion	critical	component2	TRUE	Empty	NonEmpty	Default	Low
        //summary valid
        const summary = "TestCase7 " + currentDateString
        cy.get('input[id="field-summary"]').type(summary);

        //reporter default

        //description empty

        //type defect
        const type = "defect";
        cy.get('select[id="field-type"]').select(type);

        //milestone WithDueDateFuture
        const milestone = "milestoneDue";
        cy.get('select[id="field-milestone"]').select(milestone);

        //version PastVersion
        const version = "1.1past";
        cy.get('select[id="field-version"]').select(version);

        //priority critical
        const priority = "critical";
        cy.get('select[id="field-priority"]').select(priority);

        //component component2
        const component = "component1";
        cy.get('select[id="field-component"]').select(component);

        //keywords empty

        //cc nonempty
        const cc = "any_cc";
        cy.get('input[id="field-cc"]').type(cc);

        //owner default

        //severity Low
        const severity = "Low";
        cy.get('select[id="field-severity"]').select(severity);

        //fileattached true
        cy.get('input[name="attachment"]').click();

        cy.get('input[value="Create ticket"]').click();

        cy.get('input[type="file"]').selectFile('cypress\\fixtures\\SampleFile.txt');
        cy.get('input[value="Add attachment"]').click();
        cy.xpath('//div[@id="content"]/h1/a').click();




        //--evaluation--

        //summary exists
        cy.contains(summary).should('exist');

        //reporter default
        cy.get('td[headers="h_reporter"]').find('a').contains('trac_admin').should('exist');

        //owner default
        cy.get('td[headers="h_owner"]').find('a').contains('somebody').should('exist');

        //priority blocker
        cy.get('td[headers="h_priority"]').find('a').contains(priority).should('exist');

        //milestone WithoutDueDate
        cy.get('td[headers="h_milestone"]').find('a').contains(milestone).should('exist');

        //component component2
        cy.get('td[headers="h_component"]').find('a').contains(component).should('exist');

        //version PastVersion
        cy.get('td[headers="h_version"]').find('a').contains(version).should('exist');

        //severity Low
        cy.get('td[headers="h_severity"]').find('a').contains(severity).should('exist');

        //keywords empty


        //cc nonempty
        cy.get('td[headers="h_cc"]').find('a').contains(cc).should('exist');

        //description empty

        //type defect
        cy.get('span[class="trac-type"]').find('a').contains(type).should('exist');

        //fileattached true
        cy.get('li[class="trac-field-attachment"]').should('exist');
    })

    it('testcase10', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //10	Empty	Default	NonEmpty	Defect	WithDueDateFuture	NoDateVersion	minor	component1	TRUE	NonEmpty	NonEmpty	Empty	Low
        
        //summary empty

        //reporter default

        //description nonempty
        const description = "description";
        cy.get('textarea[id="field-description"]').type(description);

        //type edefect
        const type = "defect";
        cy.get('select[id="field-type"]').select(type);

        //milestone WithDueDateFuture
        const milestone = "milestoneDue";
        cy.get('select[id="field-milestone"]').select(milestone);

        //version NoDateVersion
        const version = "1.0";
        cy.get('select[id="field-version"]').select(version);

        //priority minor
        const priority = "minor";
        cy.get('select[id="field-priority"]').select(priority);

        //component component1
        const component = "component1";
        cy.get('select[id="field-component"]').select(component);

        //keywords nonempty
        const keywords = "keyword1 keyword2"
        cy.get('input[id="field-keywords"]').type(keywords);

        //cc nonempty
        const cc = "any_cc";
        cy.get('input[id="field-cc"]').type(cc);

        //owner empty
        cy.get('input[id="field-owner"]').clear();

        //severity Low
        const severity = "Low";
        cy.get('select[id="field-severity"]').select(severity);

        //fileattached true
        cy.get('input[name="attachment"]').click();




        cy.get('input[value="Create ticket"]').click();
        //--evaluation--

        cy.get('div[id="warning"]').should('exist');
        cy.contains("Tickets must contain a summary.").should('exist');
    })

    it('testcase16', () => {
        const currentDate = new Date();
        const currentDateString = currentDate.toLocaleDateString('cs-CZ').replace(' ', '') + " " + currentDate.toLocaleTimeString('cs-CZ');
        //16	Valid	Default	NonEmpty	Defect	WithDueDateFuture	NoDateVersion	critical	component1	FALSE	NonEmpty	NonEmpty	Other	Low
        //summary valid
        const summary = "TestCase16 " + currentDateString
        cy.get('input[id="field-summary"]').type(summary);

        //reporter default

        //description nonempty
        const description = "description";
        cy.get('textarea[id="field-description"]').type(description);

        //type defect
        const type = "defect";
        cy.get('select[id="field-type"]').select(type);

        //milestone WithDueDateFuture
        const milestone = "milestoneDue";
        cy.get('select[id="field-milestone"]').select(milestone);

        //version NoDateVersion
        const version = "1.0";
        cy.get('select[id="field-version"]').select(version);

        //priority critical
        const priority = "critical";
        cy.get('select[id="field-priority"]').select(priority);

        //component component1
        const component = "component1";
        cy.get('select[id="field-component"]').select(component);

        //keywords nonempty
        const keywords = "keyword1 keyword2"
        cy.get('input[id="field-keywords"]').type(keywords);

        //cc nonempty
        const cc = "any_cc";
        cy.get('input[id="field-cc"]').type(cc);

        //owner other
        const owner = "any_owner"
        cy.get('input[id="field-owner"]').clear().type(owner);

        //severity Low
        const severity = "Low";
        cy.get('select[id="field-severity"]').select(severity);

        //fileattached false




        cy.get('input[value="Create ticket"]').click();
        //--evaluation--

        //summary exists
        cy.contains(summary).should('exist');

        //reporter default
        cy.get('td[headers="h_reporter"]').find('a').contains('trac_admin').should('exist');

        //owner other
        cy.get('td[headers="h_owner"]').find('a').contains(owner).should('exist');

        //priority critical
        cy.get('td[headers="h_priority"]').find('a').contains(priority).should('exist');

        //milestone WithDueDateFuture
        cy.get('td[headers="h_milestone"]').find('a').contains(milestone).should('exist');

        //component component1
        cy.get('td[headers="h_component"]').find('a').contains(component).should('exist');

        //version NoDateVersion
        cy.get('td[headers="h_version"]').find('a').contains(version).should('exist');

        //severity Low
        cy.get('td[headers="h_severity"]').find('a').contains(severity).should('exist');

        //keywords nonempty
        //SUT splits keywords into different <a> elements
        cy.contains(keywords).should('exist');

        //cc nonempty
        cy.get('td[headers="h_cc"]').find('a').contains(cc).should('exist');

        //description nonempty
        cy.xpath('//div[@class="searchable"]/p').contains(description).should('exist');

        //type defect
        cy.get('span[class="trac-type"]').find('a').contains(type).should('exist');
    })
})

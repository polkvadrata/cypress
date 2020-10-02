xdescribe('Table with Pagination Example', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/table-pagination-demo.html');

    });

    xit('count of rows', () => {
        let maxRowsPerPage = 5
        cy.get('#myTable [style*="display: table-row;"]').should('have.length', maxRowsPerPage);
        
        cy.get('#myPager a.next_link').click();
        cy.get('#myTable [style*="display: table-row;"]').should('have.length', maxRowsPerPage);
    });

    xit('enable Prew and Next btns', () => {
        cy.get('#myPager a.prev_link').should('not.be.visible');
        cy.get('#myPager a.next_link').should('be.visible');
        cy.get('#myPager a.next_link').click();

        cy.get('#myPager a.prev_link').should('be.visible');
        cy.get('#myPager a.next_link').should('be.visible');
        cy.get('#myPager a.next_link').click();

        cy.get('#myPager a.prev_link').should('be.visible');
        cy.get('#myPager a.next_link').should('not.be.visible');
    });
});
xdescribe('Type in your search to filter data by Tasks / Assignee / Status', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/table-search-filter-demo.html');

    });

    xit('search by 1 input', () => {
        let searchTask = 'Page';
        let searchAssignee = 'John';
        let searchStatus = 'qa';

        cy.get('#task-table-filter').type(searchTask)
        cy.get('#task-table tbody tr:visible td:nth-child(2)').should('contain', searchTask);

        cy.get('#task-table-filter').clear()
        cy.get('#task-table-filter').type(searchAssignee)
        cy.get("#task-table tbody tr:visible td:nth-child(3)").each(($el) => {
            cy.wrap($el).should("contain", searchAssignee);
        });
        
        cy.get('#task-table-filter').clear()
        cy.get('#task-table-filter').type(searchStatus)
        cy.get("#task-table tbody tr:visible td:nth-child(4)").each(($el) => {
            cy.wrap($el).should("contain", searchStatus);
        });
    });

    it('search by multiple inputs', () => {
        let id = '2';
        let userName = 'markino';
        let firstName = 'Brigade';
        let lastName = 'Dimarison';
        
        cy.get('.btn-filter').click();
        
        cy.get('tr.filters th:nth-child(1) input').type(id);
        cy.contains('Listed Users').parent().parent().find('tbody tr:visible td:nth-child(1)').should('have.text', id);

        cy.get('tr.filters th:nth-child(1) input').clear()
        cy.get('tr.filters th:nth-child(2) input').type(userName);
        cy.contains('Listed Users').parent().parent().find('tbody tr:visible td:nth-child(2)').should('have.text', userName);

        cy.get('tr.filters th:nth-child(2) input').clear()
        cy.get('tr.filters th:nth-child(3) input').type(firstName);
        cy.contains('Listed Users').parent().parent().find('tbody tr:visible td:nth-child(3)').should('have.text', firstName);

        cy.get('tr.filters th:nth-child(3) input').clear()
        cy.get('tr.filters th:nth-child(4) input').type(lastName);
        cy.contains('Listed Users').parent().parent().find('tbody tr:visible td:nth-child(4)').should('have.text', lastName);
    });
});
describe('Table Filter Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html');
    });

    xit('filter by color', () => {
        cy.get('div.btn-group').contains('Green').click();
        cy.get(".table-filter tr:visible .media i").each(($el) => {
            cy.wrap($el).should('have.css', 'color', 'rgb(0, 128, 0)');
        });
        cy.get(".table-filter tr:visible .media .media-body .title span").each(($el) => {
            cy.wrap($el).should('have.text', '(Green)');
        });

        //........

    });

    it('search by multiple inputs', () => {
        let rowsBeforeSorting;
        cy.get('.table-filter tr').then(el => {
            rowsBeforeSorting = Cypress.$(el).length;
            });

        cy.get('div.btn-group').contains('Green').click();
        cy.get('div.btn-group').contains('All').click();
        
        cy.get('.table-filter tr').then(($el) => {
            expect($el).to.have.length(rowsBeforeSorting);
            });
    });
});
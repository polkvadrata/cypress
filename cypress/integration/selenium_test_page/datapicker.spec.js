let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

describe('Simple Form Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/bootstrap-date-picker-demo.html');

    });

    xit('Select date', () => {
        let testDate = '15/06/1955'
        let century = '1900';
        let decade = '1950'
        let year = '1955';
        let month = 'Jun'
        let date = '15'

        cy.get('#sandbox-container1 span').click()

        cy.get('.datepicker .datepicker-days .datepicker-switch').click()
        cy.get('.datepicker .datepicker-months .datepicker-switch').click()
        cy.get('.datepicker .datepicker-years .datepicker-switch').click()
        cy.get('.datepicker .datepicker-decades .datepicker-switch').click()

        cy.get('.datepicker-centuries').contains(century).click();
        cy.get('.datepicker-decades').contains(decade).click();
        cy.get('.datepicker-years').contains(year).click();
        cy.get('.datepicker-months').contains(month).click();
        cy.get('.datepicker-days').contains(date).click();

        //cy.get('#sandbox-container1 input').type(testDate).should('have.value', testDate)
        cy.get('#sandbox-container1 input').should('have.value', testDate)
    });

    xit('Set current day', () => {
        cy.get('#sandbox-container1 span').click()
        cy.get('.datepicker').contains('Today').click();
        cy.get('#sandbox-container1 input').should('have.value', today);
    });

    it('Clear selected date', () => {
        cy.get('#sandbox-container1 span').click()
        cy.get('.datepicker').contains('Today').click();

        cy.get('#sandbox-container1 span').click()
        cy.get('.datepicker').contains('Clear').click();

        cy.get('#sandbox-container1 input').should('have.value', '');
    });
});
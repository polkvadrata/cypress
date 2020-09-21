let a = 10;
let test_data = {
    value: "test123456",
    a: 10,
    b: 22,
    sex: ["Male", "Female"],
    age: ["0 - 5", "5 - 15", "15 - 50"],
}

xdescribe('Simple Form Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/basic-first-form-demo.html');
        cy.get('#at-cv-lightbox-close').click();
    });

    it('Single Input Field', () => {
        cy.get('#user-message').type(test_data.value).should('have.value', test_data.value)
        cy.get('#get-input button').click();
        cy.get('#display').should('have.text', test_data.value);
    });

    it('Two Input Fields', () => {
        cy.get('#sum1').type(test_data.a).should('have.value', test_data.a)
        cy.get('#sum2').type(test_data.b).should('have.value', test_data.b)
        cy.get('#gettotal button').click();
        cy.get('#displayvalue').should('have.text', +test_data.a + test_data.b);
    });
});

xdescribe('Checkbox Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/basic-checkbox-demo.html');
    });

    it('Single Checkbox Demo', () => {
        cy.get('#isAgeSelected').not('[disabled]').check().should('be.checked')
        cy.get('#txtAge').should('be.visible')

        cy.get('#isAgeSelected').not('[disabled]').uncheck().should('not.be.checked')
        cy.get('#txtAge').should('be.hidden')
    });

    it('Multiple Checkbox Demo', () => {
        let list = '#easycont > div > div.col-md-6.text-left > div:nth-child(5) > div.panel-body div'
        cy.get(list).find('[type="checkbox"]').not('[disabled]').check().should('be.checked')
        cy.get('#check1').should('have.value', "Uncheck All")

        cy.get('#check1').click().should('have.value', "Check All")
        cy.get(list).find('[type="checkbox"]').should('not.be.checked')
    });
});

xdescribe('Radio Buttons Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/basic-radiobutton-demo.html');
    });

    it('Radio Button Demo', () => {
        cy.contains('Radio Button Demo').parent().find('[value="Male"]').check().should('be.checked')
        cy.get("#buttoncheck").click()
        cy.contains('Radio Button Demo').parent().find('p.radiobutton').should('have.text', "Radio button 'Male' is checked")

        cy.contains('Radio Button Demo').parent().find('[value="Female"]').check().should('be.checked')
        cy.get("#buttoncheck").click()
        cy.contains('Radio Button Demo').parent().find('p.radiobutton').should('have.text', "Radio button 'Female' is checked")
    });

    it('Group Radio Buttons Demo', () => {
        let i = 0;
        let j = 1;

        let sex_value = '[value="' + test_data.sex[j] + '"]';
        let age_value = '[value="' + test_data.age[i] + '"]';
        let text = 'Sex : ' + test_data.sex[j] + " Age group: " + test_data.age[i]

        cy.contains('Group Radio Buttons Demo').parent().find(sex_value).check().should('be.checked')
        cy.contains('Group Radio Buttons Demo').parent().find(age_value).check().should('be.checked')
        cy.contains('Get values').click()
        cy.get('p.groupradiobutton').should('have.text', text)
    });
});

xdescribe('Select List Demo', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/basic-select-dropdown-demo.html');
    });

    xit('Radio Button Demo', () => {
        let day = "Tuesday";
        cy.get("#select-demo").select(day)
        cy.get("#select-demo ~ p.selected-value").should('have.text', "Day selected :- " + day);
    });

    it('Multi Select List Demo', () => {
        let city = ["New Jersey", "Ohio", "Washington"]
        cy.contains(city[0]).click({ ctrlKey: true })
        cy.contains(city[1]).click({ ctrlKey: true })
        cy.contains(city[2]).click({ ctrlKey: true })

        cy.get("#printMe").click();
        cy.get("#multi-select~p.getall-selected").should('have.text', "First selected option is : " + city[0]);

        cy.get("#printAll").click();
        cy.get("#multi-select~p.getall-selected").should('have.text', "Options selected are : " + city[0] + ',' + city[1] + ',' + city[2]);
    });
});

xdescribe('Ajax Form Submit with Loading icon', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/ajax-form-submit-demo.html');
    });

    it('submit with valid data', () => {
        cy.get("#title").type("title")
        cy.get("#description").type("description")
        cy.get('#btn-submit').click()

        cy.get("#submit-control img").should("be.visible");
        //cy.get("#submit-control").should("have.text", "Ajax");

        cy.get("#submit-control").should("have.text", "Form submited Successfully!");
        cy.get("#submit-control img").should('not.exist');
        cy.get('#btn-submit').should('not.exist');
    });
});

describe('Single Select - Search and Select country', () => {
    beforeEach(() => {
        cy.visit('https://www.seleniumeasy.com/test/jquery-dropdown-search-demo.html');
    });

    xit('Drop Down with Search box', () => {
        let part = "ca"
        //let part = "de"

        cy.get('[aria-labelledby = "select2-country-container"]').click()
        cy.get('span>input.select2-search__field').type(part);

        cy.get("#select2-country-results > li").each(($el) => {
            cy.wrap($el).should("contain", part);
        });
    });

    xit('Select Multiple Values', () => {
        let part = "col";
        let re = new RegExp(part, 'i');

        cy.get('span.select2-container--default span.select2-selection--multiple').click()
        cy.get('input.select2-search__field').type(part);
        cy.get("ul.select2-results__options li:first-child").click();

        cy.get("span.select2-selection--multiple li:first-child").invoke('text').should('match', re)
    });

    xit('Drop Down with Disabled values', () => {
        let territorie = "gu";
        let re = new RegExp(territorie, 'i');
        
        cy.contains('Drop Down with Disabled values').parent().parent().find('.select2-selection__arrow b').click()
        cy.get('span.select2-search--dropdown input').type(territorie);
        cy.get("span.select2-container--open ul>li")
        .should('have.attr', 'aria-disabled', 'true')
        .invoke('text').should('match', re);
    });

});

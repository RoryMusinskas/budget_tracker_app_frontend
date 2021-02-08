describe("expenses page should be a protected route", () => {
  it("should not an allow a logged out user to the expenses page", () => {
    cy.visit("/admin/expenses");
    cy.get(".c93b5c4a9")
      .should("exist");
  })
  it("should allow the user to login with username and password", () => {
    cy.get("#username")
      .should("exist")
      .type(Cypress.env("auth_username"));
    cy.get("#password")
      .should("exist")
      .type(Cypress.env("auth_password"));
    cy.get(".cf251da15")
      .should("exist")  
      .click();
  })
})

describe("users are able to view expenses page after logging in", () => {
  it("can view add expense button", () => {
    cy.findByText(/add expense/i)
      .should("exist")
  })
  it("can view expenses analysis bar chart", () => {
    cy.findByText(/expense analysis/i).should("exist")
    cy.get('.makeStyles-expensesAnalysisContainer-94 > .MuiGrid-root > .makeStyles-card-106 > .makeStyles-cardBody-120')
      .should("exist")
  })
  it("can view analysis pie chart", () => {
    cy.get('.toggle-button > .MuiButtonBase-root')
      .should("exist")
      .click({force: true});
    cy.get('.chartjs-render-monitor')
      .should("exist")
    cy.findByText(/grocery/i)
      .should("exist")
  })
  it("can view expenses history tab", () => {
    cy.findByText(/expenses history/i)
      .should("exist")
    cy.get('.makeStyles-expensesHistoryCardBody-99')
      .should("exist")
  })
})

describe("users can add expense after logging in", () => {
  it("user can click Add Expense button", () => {
    cy.get('.makeStyles-container-4 > :nth-child(1) > div > .MuiButtonBase-root')
      .should("exist")    
      .click();
  })
  it("users can type input into title", () => {
    cy.get('#title-input')
      .type("Test Title 1")
      .should("have.value", "Test Title 1")
  })
  it("users can type input into amount", () => {
    cy.get('#amount-input')
      .type("1234")
      .should("have.value", "1234")
  })
  it("users can type input into description", () => {
    cy.get('#description-input')
      .type("This is a test description")
      .should("have.value", "This is a test description")
  })
  it("users can type select a category", () => {
    cy.get('#select-category').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
  })
  it("users can type input into date", () => {
    cy.get('.react-date-picker__inputGroup__month')
      .type(2)
      .should("have.value", "2")
    cy.get('.react-date-picker__inputGroup__day')
      .type(2)
      .should("have.value", "2")
    cy.get('.react-date-picker__inputGroup__year')
      .type(2021)
      .should("have.value", "2021")
  })
  it("users can submit and create the expense", () => {
    cy.get('#submit-button').click();
  }) 
})

describe("user's expenses can be edited if an expense exist", () => {
  it("users can see and click the edit button", () => {
    cy.get('.makeStyles-cardHeader-110 > div > .MuiSvgIcon-root')
    .should("exist")
    .click();
  })
  it("user can input edits to title", () => {
    cy.get('#title-input')
    .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
    .type("Test Title 2")
    .should("have.value", "Test Title 2");
  })
  it("user can input edits to amount", () => {
    cy.get('#amount-input')
      .type("{backspace}{backspace}{backspace}{backspace}")
      .type("1111")
      .should("have.value", "1111")
  })
    it("user can input edits to description", () => {
      cy.get('#description-input')
      .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
      .type("This is the edited description")
      .should("have.value", "This is the edited description")
    })
    it("user can input select a different category", () => {
      cy.get('#select-category').click();
      cy.get('[data-value="2"]').click();
    })
  it("user can input a different date", () => {
    cy.get('.react-date-picker__inputGroup__month')
    .type("{backspace}")
    .type(3)
    .should("have.value", "3")
    cy.get('.react-date-picker__inputGroup__day')
    .type("{backspace}")
    .type(3)
    .should("have.value", "3")
    cy.get('.react-date-picker__inputGroup__year').type(2022)
    .type("{backspace}{backspace}{backspace}{backspace}")
    .type(2022)
    .should("have.value", "2022")
  })
  it("user can submit after editing", () => {
    cy.get('#submit-button').click();
  })
})

describe("user can delete an expense", () => {
  it("user can see and click the delete button", () => {
    cy.get('.makeStyles-expenseDeleteButton-125')
      .should("exist")
      .click();
  })
})

describe("logging out the user", () => {
  it("should allow the user to logout of the application", () => {
    cy.get(
      ".PrivateHiddenCss-smDown-34 > :nth-child(1) > .makeStyles-manager-67 > .MuiButtonBase-root > .MuiButton-label > .MuiSvgIcon-root > path"
    ).click();
    cy.get(".MuiList-root > .MuiButtonBase-root").click();
    cy.get(":nth-child(1) > .MuiButtonBase-root > .MuiButton-label").should(
      "exist"
    );
  });
});


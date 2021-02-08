describe("expenses page should be a protected route", () => {
  it("should not an allow a logged out user to the goals page", () => {
    cy.visit("/admin/expenses");
    cy.get(".c93b5c4a9").should("exist");
  })
  it("should allow the user to login with username and password", () => {
    cy.get("#username").type(Cypress.env("auth_username"));
    cy.get("#password").type(Cypress.env("auth_password"));
    cy.get(".cf251da15").click();
  })
})

describe("users are able to view expenses page after logging in", () => {
  it("can view new expenses button", () => {
    cy.findByText(/add expense/i)
  })
  it("can view analysis bar chart", () => {
    cy.findByText(/expense analysis/i)
  })
})
describe("expenses can be created after logging in", () => {
  it("user can create a new expense", () => {
    cy.visit("/admin/expenses");
    cy.get('.makeStyles-container-4 > :nth-child(1) > div > .MuiButtonBase-root').click();
    cy.get('#title-input').type("Test Title 1")
    cy.get('#amount-input').type("1234")
    cy.get('#description-input').type("This is a test description")
    cy.get('#select-category').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('.react-date-picker__inputGroup__month').type(2)
    cy.get('.react-date-picker__inputGroup__day').type(2)
    cy.get('.react-date-picker__inputGroup__year').type(2021)
    cy.get('#submit-button').click();
  })
})
describe("clicking shares page", () => {
  it("renders the edit watchlist button", () => {
    cy.login();
    cy.visit("/admin/shares");
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).should("exist");
  });

  it("renders the trading view shares widget", () => {
    cy.login();
    cy.visit("/admin/shares");
    cy.get("iframe").should("exist");
  });
});

describe("open and close the edit watchlist modal", () => {
  it("should be able to click the edit watchlist button", () => {
    cy.visit("/admin/shares");
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
  });
  it("should close by clicking away from the modal", () => {
    cy.get(".makeStyles-paper-113").blur();
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
  });
});

describe("clicking the edit watchlist button", () => {
  it("should be able to click the edit watchlist button", () => {
    cy.visit("/admin/shares");
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
  });

  it("should render the modal once the edit watchlist button is clicked", () => {
    cy.get("#transition-modal-title").should("exist");
  });

  it("should render the exchange search box", () => {
    cy.get(
      ".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).should("exist");
  });

  it("should render the next button", () => {
    cy.get(".makeStyles-paper-113 > :nth-child(3)").should("exist");
  });

  it("should render the remove stock button", () => {
    cy.get(".makeStyles-paper-113 > :nth-child(4)").should("exist");
  });
  it("should exit the modal when the user clicks escape", () => {
    cy.get("body").type("{esc}", { force: true });
  });
});

describe("selecting an exchange", () => {
  it("should be able to click the edit watchlist button", () => {
    cy.visit("/admin/shares");
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
  });

  it("should render the modal once the edit watchlist button is clicked", () => {
    cy.get("#transition-modal-title").should("exist");
  });

  it("should render the exchange search box", () => {
    cy.get(
      ".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).should("exist");
  });
});

describe("clicking the remove stock button", () => {
  it("should be able to click the remove stock button", () => {
    cy.visit("/admin/shares");
    cy.get(".makeStyles-paper-113 > :nth-child(4)").click();
  });
  it("should have the remove stock from watchlist title", () => {
    cy.get(".MuiTypography-root").should("exist");
  });
  it("should render the close modal button", () => {
    cy.get(".makeStyles-paper-113 > .MuiButtonBase-root").should("exist");
  });
  it("clicking the close button should close the modal", () => {
    cy.get(".makeStyles-paper-113 > .MuiButtonBase-root").click();
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).should("exist");
  });
});

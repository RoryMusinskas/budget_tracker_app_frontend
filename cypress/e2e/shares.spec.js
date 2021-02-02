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
    ).click({ force: true });
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

describe("selecting a stock", () => {
  context("it should allow the user to select an exchange", () => {
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

    it("should not allow the user to navigate to the share select page without selecting an exchange", () => {
      cy.get(".makeStyles-paper-113 > :nth-child(3)").click();
      cy.get(".makeStyles-paper-113 > :nth-child(3)").should("exist");
    });

    it("should allow the user to click the dropdown button", () => {
      cy.get(
        ".MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root > path"
      ).click();
    });
    it("should allow the user to select one of the exchanges", () => {
      cy.get("#exchange-select").type("asx{enter}");
      cy.get("#exchange-select").should("have.value", "AX (AUSTRALIAN ASX)");
    });
    it("should allow the user to select the next button after selecting an exchange", () => {
      cy.get(".makeStyles-paper-113 > :nth-child(3)").click();
    });
  });
  context("it should allow the user to select a stock", () => {
    it("should render the stock search box", () => {
      cy.get("#stock-list").should("exist");
    });

    it("should not allow the user to click add stock button before they have selected a stock", () => {
      cy.get(".makeStyles-paper-113 > :nth-child(3)").click();
      cy.get(".makeStyles-paper-113 > :nth-child(3)").should("exist");
    });

    it("should allow the user to click the dropdown button", () => {
      cy.get(
        ".MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root > path"
      ).click();
    });
    it("should allow the user to select one of the stocks", () => {
      cy.get("#stock-list").type("jumbo{downArrow}{enter}");
      cy.get("#stock-list").should("have.value", "JUMBO INTERACTIVE LTD");
    });
    it("should allow the user to select the add to watchlist button after selecting an stock", () => {
      cy.get(".makeStyles-paper-113 > .MuiButton-root").click();
      cy.get(
        ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
      ).should("exist");
    });
  });
});

describe("clicking the remove stock button", () => {
  it("should be able to click the edit watchlist button", () => {
    cy.visit("/admin/shares");
    cy.get(
      ".MuiGrid-grid-md-12 > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
  });
  it("should be able to click the remove stock button", () => {
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

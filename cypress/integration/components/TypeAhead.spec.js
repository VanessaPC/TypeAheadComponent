// import cy from "cypress";
/// <reference types="cypress" />

// todo: test for special clicks on user interface, tab and shiftkey tab .

context("TypeAhead component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("User can see and successfully search strings", () => {
    it("It is able to see the search on the page", () => {
      cy.get("[data-cy=search-container]");
    });

    it("User is able to click on the search input and enter characters,", () => {
      cy.get("[data-cy=search-input]").click();
      cy.get("[data-cy=search-input]").type("A").should("contain.value", "A");
    });

    it("User is able to start typing valid characters in the input and see corresponding results", () => {
      cy.get("[data-cy=search-input]").type("A").should("contain.value", "A");
      cy.get("[data-cy=search-result-item]").contains("AliceBlue");
      cy.get("[data-cy=search-result-item]").should("have.length", 5);
    });
  });

  describe("Search does not display not matching results", () => {
    it("User enters non matching characters", () => {
      cy.get("[data-cy=search-input]").type("a").should("contain.value", "a");
      cy.get("[data-cy=search-result-item]").should("have.length", 0);
    });
  });

  describe("User can focus elements", () => {
    it("Focuses the input, and list elements", () => {
      cy.get("[data-cy=search-input]")
        .type("A")
        .should("contain.value", "A")
        .focus();
      cy.get("[data-cy=search-result-item]")
        .eq(0)
        .focus()
        .contains("AliceBlue")
        .focus();
    });
  });
});

import React from "react"
import Button from "./Button"

describe("<Button />", () => {
  it("Renders children", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button>Button Text</Button>)
    cy.get(`[data-cy="btn"]`).as("btn")
    cy.get("@btn").should("contain.text", "Button Text")
    // btn.get(`[data-cy="btn"]`).should('contain.text','Button')
  })

  it("Renders as button element", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button>Button</Button>)
    cy.get(`[data-cy="btn"]`).as("btn")
    cy.get("@btn").should("contain.html", "Button")
  })

  it("Active loading state", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button loading>Button</Button>)
    cy.get(`[data-cy="btn"]`).as("btn")
    cy.get(`[data-cy="btn-loading-spinner"]`)
  })

  it("Click to show temporary loading state", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button loadingFor={300}>Button</Button>)
    cy.get(`[data-cy="btn"]`).as("btn").click()
    cy.get(`[data-cy="btn-loading-spinner"]`).should("exist")
    cy.wait(300+100)
    cy.get(`[data-cy="btn-loading-spinner"]`).should('not.exist')
  })
})

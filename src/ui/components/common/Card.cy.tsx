import React from "react"
import { Card } from "./Card"

describe("<Card />", () => {
  it("Renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card />)
  })

  it("Renders children", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card>this is card</Card>)
    cy.get(`[data-cy="card"]`).should('contain.html','this is card')
  })
})

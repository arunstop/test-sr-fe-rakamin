import React from "react"
import ProgressBar from "./ProgressBar"
import { getTypeStyle } from "../../helpers/style"
import { TType } from "../../../app/types/commons"

describe("<ProgressBar />", () => {
  function renderColorValue(value: number, type: TType) {
    it(`Renders correct value and color (val == ${value}) => ${type}`, () => {
      cy.mount(<ProgressBar value={value} />)
      cy.get(`[data-cy="progress-bar"]`)
        .children()
        .get(`[data-cy="progress-bar-bar"]`)
        .should("contain.html", type)
    })
  }

  function renderIcon(value: number, icon?: boolean) {
    // only shows text when it is not 0 or 100
    it(`Renders icon based on value (val == ${value}) => ${icon}`, () => {
      cy.mount(<ProgressBar value={value} />)
      cy.get(`[data-cy="progress-bar"]`).as("progress")
      cy.get(`@progress`)
        .children()
        .get(`[data-cy="progress-bar-value"]`)
        .should(icon ? "not.exist" : "exist")

      cy.get(`@progress`)
        .children()
        .get(`[data-cy="progress-bar-icon"]`)
        .should(icon ? "exist" : "not.exist")
    })
  }

  it("Renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProgressBar value={50} />)
    cy.get(`[data-cy="progress-bar"]`)
  })

  it("Renders correct bar value", () => {
    cy.mount(<ProgressBar value={50} />)
    cy.get(`[data-cy="progress-bar"]`)
      .children()
      .get(`[data-cy="progress-bar-bar"]`)
      .children()
      .should("have.css", "width", `50%`)
  })

  renderColorValue(0, "danger")
  renderColorValue(20, "primary")
  renderColorValue(100, "success")

  renderIcon(0, true)
  renderIcon(50, false)
  renderIcon(100, true)
})

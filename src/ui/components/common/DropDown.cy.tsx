import React from "react"
import DropDown from "./DropDown"
import Button from "./Button"

describe("<DropDown />", () => {
  it("Renders", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div></div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).should("exist")
  })

  it("Renders button", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div>content</div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    cy.get(`@dropdown`).children().children()
  })

  it("Renders dropdown content", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div>content</div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    cy.get(`@dropdown`).children().children().click()
    cy.get(`@dropdown`).children().last().should("exist")
  })

  it("Click outside to close", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div>content</div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    cy.get(`@dropdown`).children().children().click()
    cy.wait(500)
    cy.get(`body`).click()
    // if children length == 1 it means the content is hidden
    cy.get(`@dropdown`).children().should("have.length", 1)
  })

  it("Click button again to close", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div>content</div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    cy.get(`@dropdown`).children().first().click()
    cy.wait(500)
    cy.get(`@dropdown`).children().first().click()
    // if children length == 1 it means the content is hidden
    cy.get(`@dropdown`).children().should("have.length", 1)
  })

  it("Press esc to close", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <div>content</div>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    cy.get(`@dropdown`).children().children().click()
    cy.wait(500)
    cy.get(`body`).type(`{esc}`)
    // cy.get(`@dropdown`).children().first().children().blur()
    // cy.get(`@dropdown`).children().should("have.length", 1)
  })
})

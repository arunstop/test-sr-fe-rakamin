import React from "react"
import DropDown from "./DropDown"
import Button from "./Button"
import { Menu } from "@headlessui/react"

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
    // click trigger
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
    // click trigger
    cy.get(`@dropdown`).children().children().click()
    cy.wait(300)
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
    cy.wait(300)
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
    // click trigger
    cy.get(`@dropdown`).children().children().click()
    cy.wait(300)
    cy.get(`body`).type(`{esc}`)
  })

  it("Selection with arrow keys", () => {
    cy.mount(
      <DropDown trigger={<Button children="dropdown" />}>
        <Menu.Item>
          {({active}) => <div data-cy="option-1">{"Option 1" + (active ? " <- ACTIVE":'')}</div>}
        </Menu.Item>
        <Menu.Item>
          {({active}) => <div data-cy="option-2">{"Option 2" + (active ? " <- ACTIVE":'')}</div>}
        </Menu.Item>
        <Menu.Item>
          {({active}) => <div data-cy="option-3">{"Option 3" + (active ? " <- ACTIVE":'')}</div>}
        </Menu.Item>
      </DropDown>,
    )
    cy.get(`[data-cy="dropdown"]`).as(`dropdown`).should("exist")
    // click trigger
    cy.get(`@dropdown`).children().children().click()
    cy.wait(200)
    // pressing arrows
    cy.get(`body`).type(`{downArrow}`)
    cy.get(`[data-cy="option-1"]`).should('contain.html', 'ACTIVE').should("exist")
    cy.wait(200)
    cy.get(`body`).type(`{downArrow}`)
    cy.get(`[data-cy="option-2"]`).should('contain.html', 'ACTIVE').should("exist")
    cy.wait(200)
    cy.get(`body`).type(`{upArrow}`)
    cy.get(`[data-cy="option-1"]`).should('contain.html', 'ACTIVE').should("exist")

  })
})

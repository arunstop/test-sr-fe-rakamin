import React from "react"
import Modal from "./Modal"

describe("<Modal />", () => {
  it("Renders", () => {
    cy.mount(
      <>
        <Modal show onClose={() => {}}>
          this is modal
        </Modal>
      </>,
    )
    cy.get(`[data-cy="modal"]`)
  })

  it("Renders children", () => {
    cy.mount(
      <Modal show onClose={() => {}} title="Modal title">
        this is modal
      </Modal>,
    )
    cy.get(`[data-cy="modal"]`)
      .children()
      .last()
      .should("contain.html", "this is modal")
  })

  it("Close when ESC is pressed", () => {
    cy.mount(
      <Modal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Modal title"
      >
        this is modal
      </Modal>,
    )
    cy.get(`[data-cy="modal"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`body`).type(`{esc}`)

    cy.get(`@modal`).should("not.exist")
  })

  it("Close when click outside", () => {
    cy.mount(
      <Modal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Modal title"
      >
        this is modal
      </Modal>,
    )
    cy.get(`[data-cy="modal"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.wait(500)
    cy.get(`body`).click()

    cy.get(`@modal`).should("not.exist")
  })

  it("Close when click x button", () => {
    cy.mount(
      <Modal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Modal title"
      >
        this is modal
      </Modal>,
    )
    cy.get(`[data-cy="modal"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.wait(500)
    cy.get(`[data-cy="modal-button-close"]`).click()

    cy.get(`@modal`).should("not.exist")
  })
})

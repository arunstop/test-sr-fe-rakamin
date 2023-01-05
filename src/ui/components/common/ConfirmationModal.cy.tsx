import ConfirmationModal from "./ConfirmationModal"

describe("<ConfirmationModal />", () => {
  it("Renders", () => {
    cy.mount(
      <>
        <ConfirmationModal
          show
          onClose={() => {}}
          title="Testing modal"
          desc="This is a testing modal"
        >
          this is modal
        </ConfirmationModal>
      </>,
    )
    cy.get(`[data-cy="modal-confirmation"]`)
  })

  it("Renders children", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {}}
        title="Testing modal"
        desc="This is a testing modal"
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation-desc"]`).should(
      "contain.html",
      "This is a testing modal",
    )
    cy.get(`[data-cy="modal-confirmation-actions"]`).should("exist")
  })

  it("Close when ESC is pressed", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Testing modal"
        desc="This is a testing modal"
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`body`).type(`{esc}`)

    cy.get(`@modal`).should("not.exist")
  })

  it("Close when click outside", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Testing modal"
        desc="This is a testing modal"
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`[data-cy="modal-backdrop"]`).as("backdrop")
    cy.get(`@backdrop`).invoke("attr", "style", "height:1px").click()

    cy.get(`@modal`).should("not.exist")
  })

  it("Close when click x button", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {
          alert("remove me")
        }}
        title="Testing modal"
        desc="This is a testing modal"
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`[data-cy="modal-button-close"]`).click()

    cy.get(`@modal`).should("not.exist")
  })

  it("Clicked button okay", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {}}
        title="Testing modal"
        desc="This is a testing modal"
        ok={{
          label: "Confirm",
          action() {
            alert("ok pressed")
          },
        }}
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`[data-cy="modal-confirmation-actions"]`)
      .as("action")
      .should("exist")

    cy.get(`@action`).children().first().should("contain.html", "Confirm").click()
    cy.wait(100)
    cy.get(`@modal`).should("not.exist")
  })

  it("Clicked button cancel", () => {
    cy.mount(
      <ConfirmationModal
        show
        onClose={() => {}}
        title="Testing modal"
        desc="This is a testing modal"
        cancel={{
          label: "Cancel",
          action() {
            alert("ok pressed")
          },
        }}
      >
        this is modal
      </ConfirmationModal>,
    )
    cy.get(`[data-cy="modal-confirmation"]`).as("modal")

    cy.on("window:alert", () => {
      cy.get(`@modal`).invoke("remove")
    })
    cy.get(`[data-cy="modal-confirmation-actions"]`)
      .as("action")
      .should("exist")

    cy.get(`@action`).children().last().should("contain.html", "Cancel").click()
    cy.wait(100)
    cy.get(`@modal`).should("not.exist")
  })
})

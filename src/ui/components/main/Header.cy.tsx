import Header from "./Header"

describe("<Header />", () => {
  it("Renders", () => {
    cy.mount(<Header title="this is header" />)
    cy.get(`[data-cy="header"]`)
  })
  
  it("Renders children", () => {
    cy.mount(<Header title="this is header" />)
    cy.get(`[data-cy="header"]`)
      .get("h1")
      .should("contain.text", "this is header")
  })

  it("Renders button", () => {
    cy.mount(<Header title="this is header" />)
    cy.get(`[data-cy="header"]`).get("button")
  })

  it("Renders modal on button click", () => {
    cy.mount(<Header title="this is header" />).as('header')
    cy.get(`[data-cy="header"]`).get("button").click()
    cy.get('body').get(`[data-cy="modal"]`)
  })
  
  it("Modal close", () => {
    cy.mount(<Header title="this is header" />).as("header")
    cy.get(`[data-cy="header"]`).get("button").click()
    cy.get("body").get(`[data-cy="modal"]`)
    cy.wait(500)
    cy.get("body").type("{esc}")
  })
})

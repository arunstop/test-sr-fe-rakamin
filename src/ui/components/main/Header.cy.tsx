import Header from "./Header"

describe("<Header />", () => {
  it("Renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header title="this is header" />)
  })
  it("Renders children", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header title="this is header" />)
    cy.get(`[data-cy="header"]`)
      .get("h1")
      .should("contain.text", "this is header")
  })

  it("Renders button", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header title="this is header" />)
    cy.get(`[data-cy="header"]`).get("button")
  })

  it("Renders modal on button click", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header title="this is header" />).as('header')
    cy.get(`[data-cy="header"]`).get("button").click()
    cy.get('body').get(`[data-cy="modal"]`)
  })
})

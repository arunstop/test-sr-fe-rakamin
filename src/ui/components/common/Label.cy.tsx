import Label from "./Label"

describe("<Label />", () => {
  it("Renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Label text=""/>)
  })

  it("Renders children", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Label text="this is label"></Label>)
    cy.get(`[data-cy="label"]`).should('contain.html','this is label')
  })
})

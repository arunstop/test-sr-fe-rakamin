import React from "react"
import PageIndex from "./index"
import TodoProvider from "../../app/stores/todo/TodoProvider"

describe("<PageIndex />", () => {
  it("Renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TodoProvider init={[]}>
        <PageIndex />
      </TodoProvider>,
    )
    // cy.get(`data-cy="layout-main"`)
  })

  // it('Renders children', () => {
  //   // see: https://on.cypress.io/mounting-react
  //   cy.mount(<PageIndex />)
  //   cy.get(`data-cy="wrapper-todos"`).should('contain.html')
  // })
})

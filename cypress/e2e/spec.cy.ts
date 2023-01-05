// import "./repos/task.cy"
// import "./repos/todo.cy"

describe("ui/redirection", () => {
  //
  it("OPEN app", () => {
    cy.visit("http://localhost:3030")
  })
  // Redirect to v1
  it("REDIRECT to `/v1` if not landing there`", () => {
    cy.visit("http://localhost:3030")
    cy.url().should("contain", "http://localhost:3030/v1")
  })
  // Stays at v1
  it("OPEN `v1` should stays at `v1`", () => {
    cy.visit("http://localhost:3030/v1")
    cy.url().should("contain", "http://localhost:3030/v1")
  })
})



export {}
describe("Add todo", () => {
  before(() => {
    cy.visit("http://localhost:3030")
  })
  beforeEach(() => {
    cy.wait(200)
  })

  it("Add todo (blank input)", () => {
    // spy on POST requests to /users endpoint
    cy.intercept("POST", "/todos").as("todo/add")

    // open modal
    cy.get(`[data-cy="button-add-todo-modal"]`).click()
    // click confirm button
    cy.wait(300)
    cy.get(`[id="button-add-todo"]`).click()
    // check if the response is not empty
    // cy.on("window:alert", (t) => {
    //   expect(t).to.not.empty
    // })

    cy.wait("@todo/add").should(
      "have.nested.property",
      "response.statusCode",
      422,
    )
    // cy.get("@todo/add").its('')
    // cy.get('@addTodo').its('responseWaited').should()

    // close modal
    cy.get(`body`).type(`{esc}`)
  })

  it("Add todo", () => {
    // spy on post
    cy.intercept("POST", "/todos").as("todo/add")
    // open modal
    cy.get(`[data-cy="button-add-todo-modal"]`).click()
    cy.wait(300)
    // input form
    cy.get(`[data-cy="input-todo-name"]`)
      .type("Testing " + (Date.now() % 37))
      .blur()
    cy.get(`[data-cy="input-todo-description"]`).type("January - Feb").blur()
    cy.wait(300)
    // confirm add
    cy.get(`[id="button-add-todo"]`).click()
    // check if success
    cy.get("@todo/add").should(
      "have.nested.property",
      "response.statusCode",
      201,
    )

    cy.wait("@todo/add").then((interception) => {
      const id = interception!.response!.body.id
      cy.get(`[data-cy="todo-item-${id}"]`).scrollIntoView().should(`exist`)
    })

    // cy.get(`[data-cy="todo-item-${}"]`)
    // cy.on("window:alert", (t) => {
    //   expect(t).not.lessThan(0)
    // })
    // cy.get(`[data-cy="button-add-todo-modal"]`).click()
  })

  it("Add task (blank input)", () => {
    // spy on POST requests to /users endpoint
    cy.intercept("POST", "**/items").as("task/add")
    // get todo element and open modal
    cy.get(`[data-cy="wrapper-todos"]`)
      .scrollIntoView()
      .children()
      .last()
      .find(`[data-cy="button-add-task-modal"]`)
      .click()
    cy.wait(300)
    // click submit button
    cy.get(`[data-cy="button-add-task-confirmation"]`).click()
    cy.wait(300)

    // check if it's error
    cy.wait("@task/add").should(
      "have.nested.property",
      "response.statusCode",
      422,
    )
    cy.get(`body`).type(`{esc}`)
  })

  it("Add task", () => {
    cy.intercept("POST", "**/items").as("task/add")
    // get todo element and open modal
    cy.get(`[data-cy="wrapper-todos"]`)
      .scrollIntoView()
      .children()
      .last()
      .find(`[data-cy="button-add-task-modal"]`)
      .click()
    cy.wait(300)
    cy.get(`[data-cy="input-task-name"]`).type("New Fresh Task").blur()
    cy.get(`[data-cy="input-task-progress"]`).type("90").blur()
    cy.wait(300)
    // click submit button
    cy.get(`[data-cy="button-add-task-confirmation"]`).click()

    // check if it's error
    cy.get("@task/add").should(
      "have.nested.property",
      "response.statusCode",
      201,
    )

    cy.wait("@task/add").then((interception) => {
      const id = interception!.response!.body.id
      cy.get(`[data-cy="task-item-${id}"]`).scrollIntoView().should(`exist`)
    })
  })

  it("Edit task", () => {
    cy.intercept("PATCH", "**/items/*").as("task/edit")
    // getting the task thru todos wrapper
    cy.get(`[data-cy="wrapper-todos"]`)
      .scrollIntoView()
      .children()
      .last()
      // getting the task thru tasks warpper
      .find(`[data-cy="tasks-wrapper"]`)
      .children()
      .last()
      // getting the dropdown button
      .find(`[data-cy="dropdown"]`)
      .click()
      // open the dropdown click the edit button
      .find(".button-task-edit")
      .click()
    cy.wait(300)
    // input field
    const newTitle = "(Edited) Fresh Task"
    cy.get(`[data-cy="input-task-name"]`).clear().type(newTitle).blur()
    cy.get(`[data-cy="input-task-progress"]`).type("90").blur()
    cy.get(`[data-cy="button-add-task-confirmation"]`).click()

    cy.get("@task/edit").should(
      "have.nested.property",
      "response.statusCode",
      200,
    )

    cy.wait("@task/edit").then((interception) => {
      const id = interception!.response!.body.id
      cy.get(`[data-cy="task-item-${id}"]`)
        .scrollIntoView()
        .should("contain.html", newTitle)
    })
  })

  it("Delete task", () => {
    cy.intercept("DELETE", "**/items/*").as("task/delete")
    // getting the task thru todos wrapper
    cy.get(`[data-cy="wrapper-todos"]`)
      .scrollIntoView()
      .children()
      .last()
      // getting the task thru tasks warpper
      .find(`[data-cy="tasks-wrapper"]`)
      .children()
      .last()
      // getting the dropdown button
      .find(`[data-cy="dropdown"]`)
      .click()
      // open the dropdown click the edit button
      .find(".button-task-delete")
      .click()
    cy.wait(300)
    cy.get(`[data-cy="modal-confirmation"]`)
      .find(`[data-cy="button-modal-confirmation-ok"]`)
      .click()

    cy.get("@task/delete").should(
      "have.nested.property",
      "response.statusCode",
      204,
    )

    cy.wait("@task/delete").then((interception) => {
      const id = interception!.request.url.split("/").pop()
      cy.get(`[data-cy="task-item-${id}"]`).should("not.exist")
    })
  })
})

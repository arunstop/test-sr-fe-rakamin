import { ITodoInput } from "../../../app/types/stores/types-todo"
import { token } from "../../clients/api-todo"
import { repoTodoGet, repoTodoAdd } from "../repo-todo"


describe("repo/todo", () => {
  // it("passes", () => {
  //   cy.visit("https://example.cypress.io")
  // })
  it("GET (no token) : Should not work", async () => {
    expect((await repoTodoGet({ token: "" })).ok).to.equal(false)
  })
  it("GET : Should work", async () => {
    expect(
      await repoTodoGet({ token: token }).then((e) => !!e.json()),
    ).to.equal(true)
  })

  const input: ITodoInput = { description: "", title: "" }
  const addTodo = async (token: string, input: ITodoInput) =>
    await repoTodoAdd({
      token: "",
      input: input,
    })
  it("ADD (no token) : Should not work", async () => {
    expect((await addTodo("", input)).ok).to.equal(false)
  })
  it("ADD : Should work", async () => {
    // check if it returns a object with message
    const todo = await addTodo(token, input).then((e) =>
      e.json().then((val) => !!val.message),
    )
    expect(todo).to.equal(true)
  })
})

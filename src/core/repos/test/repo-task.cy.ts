import { ITaskInput } from "../../../app/types/stores/types-task"
import { token } from "../../clients/api-todo"
import {
  repoTaskGet,
  repoTaskAdd,
  repoTaskEdit,
  repoTaskDelete,
} from "../repo-task"

describe("repo/task", () => {
  it("GET (no token) : Should not work", async () => {
    expect((await repoTaskGet({ token: "", todoId: 1 })).ok).to.equal(false)
  })
  it("GET : Should work", async () => {
    expect(
      await repoTaskGet({ token: token, todoId: 1 }).then((e) => !!e.json()),
    ).to.equal(true)
  })

  const addTask = async (token: string, input?: ITaskInput) =>
    await repoTaskAdd({
      token: "",
      input: input || { name: "", progress_percentage: 0 },
      todoId: 1,
    })
  it("ADD (no token) : Should not work", async () => {
    expect((await addTask("")).ok).to.equal(false)
  })
  it("ADD : Should work", async () => {
    // check if it returns a object with message
    const result = await addTask(token).then((e) =>
      e.json().then((val) => !!val.message),
    )
    expect(result).to.equal(true)
  })

  const editTask = async (token: string, input?: ITaskInput) =>
    await repoTaskEdit({
      token: "",
      input: input || { name: "", progress_percentage: 0 },
      targetTodoId: 1,
      taskId: 1,
      todoId: 1,
    })
  it("EDIT (no token) : Should not work", async () => {
    expect((await editTask("")).ok).to.equal(false)
  })
  it("EDIT : Should work", async () => {
    // check if it returns a object with message
    const result = await editTask(token).then((e) =>
      e.json().then((val) => !!val.message),
    )
    expect(result).to.equal(true)
  })

  const deleteTask = async (token: string, input?: ITaskInput) =>
    await repoTaskDelete({
      token: "",
      taskId: 1,
      todoId: 1,
    })
  it("DELETE (no token) : Should not work", async () => {
    expect((await deleteTask("")).ok).to.equal(false)
  })
  it("DELETE : Should work", async () => {
    // check if it returns a object with message
    const result = await deleteTask(token).then((e) =>
      e.json().then((val) => !!val.message),
    )
    expect(result).to.equal(true)
  })
})

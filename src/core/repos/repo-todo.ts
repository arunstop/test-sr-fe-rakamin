import { ITodoInput } from "../../app/types/states/types-todo"
import { API_BASE_URL } from "../clients/api-todo"
import { ITodo } from "../data/models/todo"

const api = API_BASE_URL
export async function repoTodoGet({
  token,
}: {
  token: string
}): Promise<ITodo[]> {
  return (await fetch(api + "/todos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as unknown as ITodo[]
}

export async function repoTodoAdd({
  input,
  token,
}: {
  input: ITodoInput
  token: string
}): Promise<ITodo> {
  return (await fetch(api + "/todos", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })) as unknown as ITodo
}

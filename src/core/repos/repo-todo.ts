import { ITodoInput } from "../../app/types/states/types-todo"
import { API_BASE_URL } from "../clients/api-todo"
import { ITodo } from "../data/models/todo"

const api = API_BASE_URL
export async function repoTodoGet({ token }: { token: string }) {
  return fetch(api + "/todos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function repoTodoAdd({
  input,
  token,
}: {
  input: ITodoInput
  token: string
}) {
  return fetch(api + "/todos", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

import { ITaskInput } from "../../app/types/stores/types-task"
import { API_BASE_URL } from "../clients/api-todo"

const api = API_BASE_URL
export async function repoTaskGet({
  todoId,
  token,
}: {
  todoId: string
  token: string
}) {
  return fetch(api + `/todos/${todoId}/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function repoTaskAdd({
  todoId,
  input,
  token,
}: {
  todoId: string
  input: ITaskInput
  token: string
}) {
  return fetch(api + `/todos/${todoId}/items`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function repoTaskEdit({
  todoId,
  taskId,
  input,
  token,
}: {
  todoId: string
  taskId: string
  input: ITaskInput
  token: string
}) {
  return fetch(api + `/todos/${todoId}/items/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function repoTaskDelete({
    todoId,
    taskId,
    token,
  }: {
    todoId: string
    taskId: string
    token: string
  }) {
    return fetch(api + `/todos/${todoId}/items/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }
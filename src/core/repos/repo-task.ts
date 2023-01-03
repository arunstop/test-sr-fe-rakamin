import { IApiToken } from "../../app/types/commons"
import {
  IRepoTaskAddProps,
  IRepoTaskDeleteProps,
  IRepoTaskEditProps,
  IRepoTaskGetProps,
} from "../../app/types/stores/types-task"
import { API_BASE_URL } from "../clients/api-todo"

const api = API_BASE_URL
export async function repoTaskGet({
  todoId,
  token,
}: IRepoTaskGetProps & IApiToken) {
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
}: IRepoTaskAddProps & IApiToken) {
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
  targetTodoId,
  input,
  token,
}: IRepoTaskEditProps & IApiToken) {
  return fetch(api + `/todos/${todoId}/items/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ name: input.name, target_todo_id: targetTodoId }),
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
}: IRepoTaskDeleteProps & IApiToken) {
  return fetch(api + `/todos/${todoId}/items/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

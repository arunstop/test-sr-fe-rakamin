import { token } from "../../core/clients/api-todo"
import { ITodo } from "../../core/data/models/todo"
import { repoTodoAdd, repoTodoGet } from "../../core/repos/repo-todo"
import { IServiceReq } from "../types/service"
import {
  TServiceTodoAddProps,
  TServiceTodoGetProps,
} from "../types/stores/types-todo"

export async function serviceTodoGet({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTodoGetProps): Promise<ITodo[] | null> {
  await onLoading?.("Getting your todo list...")
  try {
    if (!data.token.trim()) throw new Error("Not Logged in")
    const resp = await repoTodoGet({ token: token })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as ITodo[]
    await onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    await onError?.((error as Error).message)
    return null
  }
}

export async function serviceTodoAdd({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTodoAddProps): Promise<ITodo | null> {
  await onLoading?.("Getting your todo list...")
  try {
    if (!data.token.trim()) throw new Error("Not Logged in")
    const resp = await repoTodoAdd({
      input: data.input,
      token: token,
    })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as ITodo
    await onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    await onError?.((error as Error).message)
    return null
  }
}

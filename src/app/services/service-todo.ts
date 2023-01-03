import { token } from "../../core/clients/api-todo"
import { ITodo } from "../../core/data/models/todo"
import { repoTodoAdd, repoTodoGet } from "../../core/repos/repo-todo"
import { IServiceReq } from "../types/service"
import { TServiceTodoAddProps } from "../types/stores/types-todo"

export async function serviceTodoGet({
  onLoading,
  onError,
  onSuccess,
}: IServiceReq<{ key: string }, ITodo[]>): Promise<ITodo[] | null> {
  await onLoading?.("Getting your todo list...")
  try {
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

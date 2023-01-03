import { token } from "../../core/clients/api-todo"
import { ITodo } from "../../core/data/models/todo"
import { repoTodoAdd, repoTodoGet } from "../../core/repos/repo-todo"
import { IServiceReq } from "../types/service"
import { ITodoInput, TServiceTodoAddProps } from "../types/states/types-todo"

export async function serviceTodoGet({
  onLoading,
  onError,
  onSuccess,
}: IServiceReq<{ key: string }, ITodo[]>): Promise<ITodo[] | null> {
  onLoading?.("Getting your todo list...")
  try {
    const res = await repoTodoGet({ token: token })
    onSuccess?.(res)
    return res
  } catch (error) {
    onError?.(error as string)
    console.log(error)
    return null
  }
}

export async function serviceTodoAdd({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTodoAddProps): Promise<ITodo | null> {
  onLoading?.("Getting your todo list...")
  try {
    const res = await repoTodoAdd({ input: data.input, token: token })
    onSuccess?.(res)
    return res
  } catch (error) {
    onError?.(error as string)
    console.log(error)
    return null
  }
}

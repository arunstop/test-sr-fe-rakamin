import { token } from "../../core/clients/api-todo"
import { ITask } from "../../core/data/models/task"
import {
  repoTaskAdd,
  repoTaskDelete,
  repoTaskEdit,
  repoTaskGet,
} from "../../core/repos/repo-task"
import { IServiceReq } from "../types/service"
import {
  IServiceTaskData,
  ITaskInput,
  TServiceTaskAddProps,
  TServiceTaskDeleteProps,
  TServiceTaskEditProps,
  TServiceTaskGetProps,
  TServiceTaskParams,
} from "../types/stores/types-task"

export async function serviceTaskGet({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTaskGetProps): Promise<ITask[] | null> {
  onLoading?.("Getting your task list...")
  try {
    const resp = await repoTaskGet({ todoId: data.todoId, token: token })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as ITask[]
    onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    onError?.((error as Error).message)
    return null
  }
}

export async function serviceTaskAdd({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTaskAddProps): Promise<ITask | null> {
  onLoading?.("Adding task...")
  try {
    const resp = await repoTaskAdd({
      todoId: data.todoId,
      input: data.input,
      token: token,
    })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as ITask
    onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    onError?.((error as Error).message)
    return null
  }
}

export async function serviceTaskEdit({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTaskEditProps): Promise<ITask | null> {
  onLoading?.("Getting your  list...")
  try {
    const resp = await repoTaskEdit({
      todoId: data.todoId,
      taskId: data.taskId,
      input: data.input,
      token: token,
    })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as ITask
    onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    onError?.((error as Error).message)
    return null
  }
}

export async function serviceTaskDelete({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceTaskDeleteProps): Promise<boolean | null> {
  onLoading?.("Getting your  list...")
  try {
    const resp = await repoTaskDelete({
      todoId: data.todoId,
      taskId: data.taskId,
      token: token,
    })
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = !!resp.ok
    onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    onError?.((error as Error).message)
    return null
  }
}

import { ITask } from "../../../core/data/models/task"
import { IServiceReq } from "../service"

export interface IStoreTaskState {
  tasks: Map<number, ITask[]>
}

export interface IStoreTaskAction {
  getTask(): void
  addTask(input: ITaskInput): void
  deleteTask(): void
  editTask(): void
}

export type IStoreTask = IStoreTaskState & IStoreTaskAction


// service related types

export interface ITaskInput {
  name: string
  progress: number
}

export interface IServiceTaskData {
  todoId: string
  taskId: string
  input: ITaskInput
}

export type TServiceTaskParams<IN, OUT = ITask> = IServiceReq<IN, OUT>
export type TServiceTaskGetProps = TServiceTaskParams<
  Pick<IServiceTaskData, "todoId">,
  ITask[]
>
export type TServiceTaskAddProps = TServiceTaskParams<
  Omit<IServiceTaskData, "taskId">
>
export type TServiceTaskEditProps = TServiceTaskParams<IServiceTaskData>
export type TServiceTaskDeleteProps = TServiceTaskParams<
  Omit<IServiceTaskData, "input">,
  boolean
>

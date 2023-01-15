import { ITask } from "../../../core/data/models/task"
import { IApiToken } from "../commons"
import { IServiceReq } from "../service"

// service related types

export interface ITaskInput {
  name: string
  progress_percentage: number | null
}

export interface IServiceTaskData {
  todoId: number
  taskId: number
  input: ITaskInput
}

export type IRepoTaskGetProps = Pick<IServiceTaskData, "todoId">
export type IRepoTaskAddProps = Omit<IServiceTaskData, "taskId">
export type IRepoTaskEditProps = IServiceTaskData & { targetTodoId: number }
export type IRepoTaskDeleteProps = Omit<IServiceTaskData, "input">

export type TServiceTaskParams<IN, OUT = ITask> = IServiceReq<IN, OUT>
export type TServiceTaskGetProps = TServiceTaskParams<
  IRepoTaskGetProps & IApiToken,
  ITask[]
>
export type TServiceTaskAddProps = TServiceTaskParams<
  IRepoTaskAddProps & IApiToken
>
export type TServiceTaskEditProps = TServiceTaskParams<
  IRepoTaskEditProps & IApiToken
>
export type TServiceTaskMoveDirection = "LEFT" | "RIGHT"
// export type TServiceTaskMoveProps = TServiceTaskEditProps & {
//   direction: TServiceTaskMoveDirection
// } & IApiToken
export type TServiceTaskDeleteProps = TServiceTaskParams<
  IRepoTaskDeleteProps & IApiToken,
  boolean
>

// store related types

export interface IStoreTaskState {
  tasks: Map<number, ITask[]>
}

export interface IStoreTaskAction {
  getTask(props: TServiceTaskGetProps): void | Promise<void>
  addTask(props: TServiceTaskAddProps): void | Promise<void>
  editTask(props: TServiceTaskEditProps): void | Promise<void>
  moveTask(props: TServiceTaskEditProps): void | Promise<void>
  deleteTask(props: TServiceTaskDeleteProps): void | Promise<void>
}

export type IStoreTask = IStoreTaskState & IStoreTaskAction

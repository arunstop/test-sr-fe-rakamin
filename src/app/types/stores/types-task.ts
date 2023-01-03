import { ITask } from "../../../core/data/models/task"
import { IServiceReq } from "../service"

// service related types

export interface ITaskInput {
  name: string
  progress_percentage: number
}

export interface IServiceTaskData {
  todoId: number
  taskId: number
  input: ITaskInput
}

export type IRepoTaskGetProps = Pick<IServiceTaskData, "todoId">
export type IRepoTaskAddProps = Omit<IServiceTaskData, "taskId">
export type IRepoTaskEditProps = IServiceTaskData
export type IRepoTaskDeleteProps = Omit<IServiceTaskData, "input">

export type TServiceTaskParams<IN, OUT = ITask> = IServiceReq<IN, OUT>
export type TServiceTaskGetProps = TServiceTaskParams<
  IRepoTaskGetProps,
  ITask[]
>
export type TServiceTaskAddProps = TServiceTaskParams<IRepoTaskAddProps>
export type TServiceTaskEditProps = TServiceTaskParams<IServiceTaskData>
export type TServiceTaskDeleteProps = TServiceTaskParams<
  IRepoTaskDeleteProps,
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
  deleteTask(props: TServiceTaskDeleteProps): void | Promise<void>
}

export type IStoreTask = IStoreTaskState & IStoreTaskAction

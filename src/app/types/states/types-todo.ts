import { ITodo } from "../../../core/data/models/todo"
import { IContextProps } from "../commons"
import { IServiceReq } from "../service"

export type TTodoContextProps = IContextProps<
  ITodoContextState,
  TTodoContextAction
>

export interface ITodoContextState {
  data: ITodo[]
}

export interface TTodoContextAction {
  addTodo(input: ITodoInput): Promise<void>
}

// For reducers
export type TTodoContextActionTypes = {
  type: "ADD_TODO"
  payload: { todo: ITodo }
}

// service
export interface ITodoInput {
  title: string
  description: string
}

// adding todo
export type TServiceTodoAddProps = IServiceReq<
  { key: string; input: ITodoInput },
  ITodo
>

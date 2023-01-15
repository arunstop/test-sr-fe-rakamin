import { IApiToken } from './../commons';
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
  addTodo(input: TServiceTodoAddProps): Promise<void>
  initTodo(): Promise<void>
}

// For reducers
export type TTodoContextActionTypes =
  | {
      type: "ADD_TODO"
      payload: ITodo
    }
  | {
      type: "INIT_TODO"
      payload: ITodo[]
    }

// service
export interface ITodoInput {
  title: string
  description: string
}

// adding todo
export type TServiceTodoAddProps = IServiceReq<{ input: ITodoInput }&IApiToken, ITodo>
export type TServiceTodoGetProps = IServiceReq<IApiToken, ITodo[]>

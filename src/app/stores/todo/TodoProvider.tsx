import { ReactNode, useEffect, useReducer } from "react"
import { TodoContext } from "./todo-context"
import {
  TTodoContextAction,
  TTodoContextProps,
} from "../../types/stores/types-todo"
import { todoReducer } from "./todo-reducer"
import { serviceTodoAdd, serviceTodoGet } from "../../services/service-todo"

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, { data: [] })
  const action: TTodoContextAction = {
    addTodo: async (params) => {
      const res = await serviceTodoAdd(params)
      if (!res) return
      dispatch({ type: "ADD_TODO", payload: res })
    },
    initTodo: async () => {
      const todos = await serviceTodoGet({ data: { key: "" } })
      if (!todos) return
      dispatch({ type: "INIT_TODO", payload: todos })
    },
  }
  const value: TTodoContextProps = {
    state: state,
    action: action,
  }
  useEffect(() => {
    action.initTodo()
    return () => {}
  }, [])
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export default TodoProvider

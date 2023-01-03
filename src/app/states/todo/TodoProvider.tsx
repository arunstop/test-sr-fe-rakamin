import { ReactNode, useReducer } from "react"
import { TodoContext } from "./todo-context"
import { TTodoContextAction, TTodoContextProps } from "../../types/states/types-todo"
import { todoReducer } from "./todo-reducer"
import { serviceTodoAdd } from "../../services/service-todo"

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, { data: [] })
  const action: TTodoContextAction = {
    addTodo: async (input) => {
      const res = await serviceTodoAdd({
        data: { key: crypto.randomUUID(), input: input },
      })
      if (!res) return
      dispatch({ type: "ADD_TODO", payload: { todo: res } })
    },
  }
  const value: TTodoContextProps = {
    state: state,
    action: action,
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export default TodoProvider

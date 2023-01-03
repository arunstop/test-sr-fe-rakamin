import { useContext } from "react"
import { TodoContext } from "./todo-context"

export const useTodo = () => useContext(TodoContext)

import { createContext } from "react"
import { TTodoContextProps } from "../../types/states/types-todo"

export const TodoContext = createContext<TTodoContextProps>(
  {} as TTodoContextProps,
)

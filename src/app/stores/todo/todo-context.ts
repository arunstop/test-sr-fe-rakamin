import { createContext } from "react"
import { TTodoContextProps } from "../../types/stores/types-todo"

export const TodoContext = createContext<TTodoContextProps>(
  {} as TTodoContextProps,
)

import create from "zustand/react"
import { IStoreTask } from "../../types/stores/types-task"

export const useStoreTask = create<IStoreTask>((set) => ({
  tasks: new Map(),
  getTask: () => {
    set((old) => {
      return old
    })
  },
  addTask: (input) => {
    set((old) => {
      return old
    })
  },
  deleteTask: () => {
    set((old) => {
        
      return old
    })
  },
  editTask: () => {
    set((old) => {
      return old
    })
  },
}))

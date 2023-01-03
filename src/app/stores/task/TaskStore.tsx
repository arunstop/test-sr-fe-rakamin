import create from "zustand"
import { IStoreTask } from "../../types/stores/types-task"
import {
  serviceTaskAdd,
  serviceTaskDelete,
  serviceTaskEdit,
  serviceTaskGet,
} from "../../services/service-task"

export const useTaskStore = create<IStoreTask>((set) => ({
  tasks: new Map(),
  getTask: async (props) => {
    const res = await serviceTaskGet(props)
    if (!res || res.length == 0) return
    console.log(res)
    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, res) }
    })
  },
  addTask: async (props) => {
    const res = await serviceTaskAdd(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId },
    })
    if (!freshTasks || freshTasks.length == 0) return
    console.log(123)
    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, freshTasks) }
    })
  },
  editTask: async (props) => {
    const res = await serviceTaskEdit(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId },
    })
    if (!freshTasks||freshTasks.length == 0) return

    set((old) => {
      return { ...old, tasks: old.tasks.set(res.id, freshTasks) }
    })
  },
  deleteTask: async (props) => {
    const res = await serviceTaskDelete(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId },
    })
    if (!freshTasks||freshTasks.length == 0) return
    set((old) => {
      //  DELETE the entry
      old.tasks.delete(2)
      // then reassign it
      // cuz returning with `old` params name only doesn't work
      // needs to be spread first
      return { ...old }
    })
  },
}))

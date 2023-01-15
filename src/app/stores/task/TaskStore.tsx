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

    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, res) }
    })
  },

  addTask: async (props) => {
    const res = await serviceTaskAdd(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId,token: props.data.token },
    })
    if (!freshTasks || freshTasks.length == 0) return

    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, freshTasks) }
    })
  },

  editTask: async (props) => {
    const res = await serviceTaskEdit(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId,token: props.data.token },
    })
    if (!freshTasks) return

    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, freshTasks) }
    })
  },

  moveTask: async (props) => {
    const res = await serviceTaskEdit(props)
    if (!res) return

    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId, token: props.data.token },
    })
    if (!freshTasks) return

    // update target todo tasks
    const freshTargetTasks = await serviceTaskGet({
      data: { todoId: props.data.targetTodoId, token: props.data.token },
    })
    if (!freshTargetTasks) return

    set((old) => {
      old.tasks.set(props.data.todoId, freshTasks)
      old.tasks.set(props.data.targetTodoId, freshTargetTasks)
      return { ...old }
    })
  },

  deleteTask: async (props) => {
    const res = await serviceTaskDelete(props)
    if (!res) return
    const freshTasks = await serviceTaskGet({
      data: { todoId: props.data.todoId,token: props.data.token },
    })
    if (!freshTasks) return
    set((old) => {
      return { ...old, tasks: old.tasks.set(props.data.todoId, freshTasks) }
    })
    //   non fresh
    // set((old) => {
    //   //  DELETE the entry
    //   old.tasks.delete(2)
    //   // then reassign it
    //   // cuz returning with `old` params name only doesn't work
    //   // needs to be spread first
    //   return { ...old }
    // })
  },
}))

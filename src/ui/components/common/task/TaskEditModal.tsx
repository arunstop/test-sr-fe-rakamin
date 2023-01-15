import { useCallback, useState } from "react"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import {
  IServiceTaskData,
  ITaskInput,
} from "../../../../app/types/stores/types-task"
import Modal, { IModalProps } from "../Modal"
import TaskForm from "./TaskForm"
import Cookies from "js-cookie"

function TaskEditModal({
  taskId,
  todoId,
  input,
  ...modalProps
}: IModalProps & IServiceTaskData) {
  const [data, setData] = useState<ITaskInput>({
    name: input.name,
    progress_percentage: input.progress_percentage,
  })
  const [loading, setLoading] = useState(false)
  const { editTask } = useTaskStore()
  function onEdit(data: ITaskInput) {
    setData(data)
  }
  const onSubmit = useCallback(async (input: ITaskInput) => {
    await editTask({
      // not changing target todo id cuz only need to edits the name/progress
      data: {
        input: input,
        todoId: todoId,
        taskId: taskId,
        targetTodoId: todoId,
        token: Cookies.get("auth_token") || "",
      },
      onLoading(message) {
        setLoading(true)
      },
      async onError(error) {
        setLoading(false)
        alert(error)
      },
      onSuccess(data) {
        modalProps.onClose()
      },
    })

    setLoading(false)
    setData({
      name: input.name,
      progress_percentage: input.progress_percentage,
    })
  }, [])
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col">
        <TaskForm
          data={data}
          onEdit={onEdit}
          onClose={modalProps.onClose}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </Modal>
  )
}

export default TaskEditModal

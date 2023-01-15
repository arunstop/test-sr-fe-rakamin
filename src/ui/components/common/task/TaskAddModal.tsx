import { useCallback, useState } from "react"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import { ITaskInput } from "../../../../app/types/stores/types-task"
import Modal, { IModalProps } from "../Modal"
import TaskForm from "./TaskForm"
import Cookies from "js-cookie"

function TaskAddModal({
  todoId,
  ...modalProps
}: IModalProps & { todoId: number }) {
  const [data, setData] = useState<ITaskInput>({
    name: "",
    progress_percentage: 0,
  })
  const [loading, setLoading] = useState(false)
  const { addTask } = useTaskStore()
  function onEdit(data: ITaskInput) {
    setData(data)
  }
  const onSubmit = useCallback(async (input: ITaskInput) => {
    await addTask({
      data: { input: input, todoId: todoId ,token:Cookies.get("auth_token")||""},
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
    setData({ name: "", progress_percentage: 0 })
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

export default TaskAddModal

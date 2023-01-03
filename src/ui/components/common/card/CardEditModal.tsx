import { useCallback, useState } from "react"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import {
  IServiceTaskData,
  ITaskInput,
} from "../../../../app/types/stores/types-task"
import Modal, { IModalProps } from "../Modal"
import CardForm from "./CardForm"

function CardEditModal({
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
  const onSubmit = useCallback(async () => {
    await editTask({
      // not changing target todo id cuz only need to edits the name/progress
      data: {
        input: data,
        todoId: todoId,
        taskId: taskId,
        targetTodoId: todoId,
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
  }, [data])
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col">
        <CardForm
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

export default CardEditModal

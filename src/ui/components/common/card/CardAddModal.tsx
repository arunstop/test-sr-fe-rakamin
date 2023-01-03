import { useCallback, useState } from "react"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import { ITaskInput } from "../../../../app/types/stores/types-task"
import Modal, { IModalProps } from "../Modal"
import CardForm from "./CardForm"

function CardAddModal({
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
  const onSubmit = useCallback(async () => {
    await addTask({
      data: { input: data, todoId: todoId },
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

export default CardAddModal

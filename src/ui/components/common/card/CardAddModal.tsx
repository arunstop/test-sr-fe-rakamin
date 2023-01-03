import React, { useCallback, useState } from "react"
import Modal, { IModalProps } from "../Modal"
import Button from "../Button"
import CardForm, { ICardFormData } from "./CardForm"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"

function CardAddModal({ todoId,...modalProps }: IModalProps&{todoId:number}) {
  const [data, setData] = useState({ name: "", progress: 0 })
  const { addTask } = useTaskStore()
  function onEdit(data: ICardFormData) {
    setData(data)
  }
  const onSubmit = useCallback(() => {
    addTask({ data: { input: data, todoId: todoId } })
  }, [data])
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col">
        <CardForm
          data={data}
          onEdit={onEdit}
          onClose={modalProps.onClose}
          onSubmit={onSubmit}
        />
      </div>
    </Modal>
  )
}

export default CardAddModal

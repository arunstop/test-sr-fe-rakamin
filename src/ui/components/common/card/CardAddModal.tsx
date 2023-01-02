import React, { useState } from "react"
import Modal, { IModalProps } from "../Modal"
import Button from "../Button"
import CardForm, { ICardFormData } from "./CardForm"

function CardAddModal({ ...modalProps }: IModalProps) {
  const [data, setData] = useState({ name: "", progress: 0 })
  const [onSubmit, setOnSubmit] = useState(() => {})
  function onEdit(data: ICardFormData) {
    setData(data)
  }
  return (
    <Modal {...modalProps} >
      <div className="flex flex-col">
        <CardForm data={data} onEdit={onEdit} onClose={modalProps.onClose} />
      </div>
    </Modal>
  )
}

export default CardAddModal

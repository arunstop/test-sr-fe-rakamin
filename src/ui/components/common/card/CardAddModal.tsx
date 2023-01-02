import React, { useState } from "react"
import Modal, { IModalProps } from "../Modal"
import Button from "../Button"
import CardForm, { ICardFormData } from "./CardForm"

function CardAddModal({ ...modalProps }: IModalProps) {
  const [data, setData] = useState({ name: "", progress: 0 })
  function onEdit(data: ICardFormData) {
    setData(data)
  }
  function onSubmit(){
    console.log(data)
  }
  return (
    <Modal {...modalProps} >
      <div className="flex flex-col">
        <CardForm data={data} onEdit={onEdit} onClose={modalProps.onClose}  onSubmit={onSubmit}/>
      </div>
    </Modal>
  )
}

export default CardAddModal

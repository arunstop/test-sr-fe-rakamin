import React from "react"
import Modal, { IModalProps } from "../Modal"
import Button from "../Button"
import CardForm from "./CardForm"

function CardAddModal({ ...modalProps }: IModalProps) {
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col">
        <CardForm onClose={modalProps.onClose}/>
      </div>
    </Modal>
  )
}

export default CardAddModal

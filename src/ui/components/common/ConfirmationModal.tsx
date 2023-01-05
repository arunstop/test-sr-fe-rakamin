import React from "react"
import Modal, { IModalProps } from "./Modal"
import Button from "./Button"
import { TType } from "../../../app/types/commons"
import { Icon } from "@iconify-icon/react"
import { getTypeStyle } from "../../helpers/style"

export interface IConfirmationModalActions {
  desc: string
  ok?: {
    label?: string
    action: () => void
  }
  cancel?: {
    label?: string
    action: () => void
  }
  type?: TType
}
function ConfirmationModal({
  type = "primary",
  desc,
  ok,
  cancel,
  ...props
}: IModalProps & IConfirmationModalActions) {
  const style = getTypeStyle(type)
  function getIcon(type: TType): React.ReactNode {
    switch (type) {
      case "primary": {
        return <Icon icon="uil:info-circle" className="text-danger" />
      }
      case "secondary": {
        return <Icon icon="uil:circle" className="text-danger" />
      }
      case "success": {
        return <Icon icon="uil:check-circle" className="text-danger" />
      }
      case "danger": {
        return <Icon icon="uil:exclamation-triangle" className="text-danger" />
      }
      default: {
      }
    }
    return
  }
  return (
    <Modal {...props} titleIcon={getIcon(type)} data-cy="modal-confirmation">
      <div className="px-6">{desc}</div>
      <div className="flex justify-end gap-[0.625rem] p-6 w-full ${style.bgMain}" data-cy="modal-confirmation-actions">
        <Button className={`${style.bgMain}`} onClick={() => ok?.action()} loadingFor={2000}>
          {ok?.label || "Okay"}
        </Button>
        <Button
          className={`border border-[#E0E0E0] bg-white text-black shadow-[0px_1px_2px] shadow-black/[0.12] order-first`}
          onClick={() => cancel?.action() || props.onClose()}
        >
          {cancel?.label || "Cancel"}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal

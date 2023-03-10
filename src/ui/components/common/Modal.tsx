import { Dialog, Transition } from "@headlessui/react"
import { Icon } from "@iconify-icon/react"
import React, { Fragment } from "react"
import Button from "./Button"

export interface IModalProps {
  show: boolean
  titleIcon?: React.ReactNode
  title?: string
  children?: React.ReactNode
  //   actions?: {
  //     ok?: {
  //       label?: string
  //       action: () => void
  //     }
  //     cancel?: {
  //       label?: string
  //       action: () => void
  //     }
  //   }
  onClose: () => void
}

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & IModalProps
>(({ show, title, titleIcon, children, onClose, ...props }, ref) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        ref={ref}
        as="div"
        className="relative z-10"
        onClose={onClose}
        data-cy="modal"
        {...props}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            data-cy="modal-backdrop"
          />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white transition-all grid ">
                {!!title && (
                  <>
                    <div className="flex gap-2 p-6 items-center">
                      {!!titleIcon && (
                        <span className="text-lg flex">{titleIcon}</span>
                      )}
                      <Dialog.Title className="text-xl font-bold">
                        {title}
                      </Dialog.Title>
                      <Button
                        className="bg-transparent ml-auto text-black px-0"
                        onClick={onClose}
                        data-cy="modal-button-close"
                        tabIndex={-1}
                      >
                        <Icon
                          icon="ion:close-round"
                          className="w-[12px] aspect-square"
                        />
                      </Button>
                    </div>
                  </>
                )}
                {children}
                {/* {!!actions && (
                  <div className="flex justify-end gap-[0.625rem] p-6 w-full">
                    <Button className="" >{actions.ok?.label || "Okay"}</Button>
                    <Button
                      className="border border-[#E0E0E0] bg-white text-black shadow-[0px_1px_2px] shadow-black/[0.12] order-first"
                      onClick={onClose}
                    >
                      {actions.cancel?.label || "Cancel"}
                    </Button>
                  </div>
                )} */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
})

export default Modal

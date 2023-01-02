import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"

function DropDown({
  trigger,
  children,
}: {
  trigger: ReactNode
  children: ReactNode
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="div">{trigger}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-75"
      >
        {children}
      </Transition>
    </Menu>
  )
}

export default DropDown

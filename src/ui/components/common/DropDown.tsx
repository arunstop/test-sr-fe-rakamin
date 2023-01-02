import { Menu } from "@headlessui/react"
import React, { ReactNode } from "react"

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
      {children}
    </Menu>
  )
}

export default DropDown

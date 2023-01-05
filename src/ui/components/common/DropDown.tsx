import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"

const DropDown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    trigger: ReactNode
    children: ReactNode
    contentClass?: string
  }
>(({ trigger, children, contentClass, ...props }, ref) => (
  <Menu
    ref={ref}
    {...props}
    as="div"
    className={`relative ${props.className}`}
    data-cy="dropdown"
  >
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
      <Menu.Items
        as="div"
        className={`absolute flex flex-col right-0 bg-white min-w-[12rem] rounded-lg overflow-hidden z-[1] py-2 
    shadow-[0px_4px_4px_rgba(0,0,0,0.08)] ${contentClass}`}
      >
        {children}
      </Menu.Items>
    </Transition>
  </Menu>
))

export default DropDown

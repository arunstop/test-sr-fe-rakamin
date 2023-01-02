import React, { ReactNode } from "react"
import DropDown from "./DropDown"
import { Menu } from "@headlessui/react"

export interface ICardOption {
  icon: ReactNode
  title: string
  action: () => void
}

function TaskOptions({
  trigger,
  options,
}: {
  trigger: ReactNode
  options: ICardOption[]
}) {
  return (
    <DropDown trigger={trigger}>
      <Menu.Items
        as="div"
        className="absolute flex flex-col right-0 bg-white min-w-[12rem] rounded-lg overflow-hidden z-[10] py-2 
        shadow-[0px_4px_4px_rgba(0,0,0,0.08)]"
      >
        {options.map((e,idx) => (
          <Menu.Item key={idx}>
            {({ active }) => (
              <div
                className={`flex gap-2 sm:gap-4 items-center px-4  py-1.5 font-bold text-[#333333]
                ${!!active && "!text-primary"} cursor-pointer`}
                onClick={e.action}
              >
                <span className="flex text-[24px]">{e.icon}</span>
                <span>{e.title}</span>
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </DropDown>
  )
}

export default TaskOptions

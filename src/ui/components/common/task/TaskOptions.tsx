import React, { ReactNode } from "react"
import DropDown from "../DropDown"
import { Menu } from "@headlessui/react"

export interface ICardOption {
  icon: ReactNode
  title: string
  hidden?: boolean
  class?: string
  activeClass?: string
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
      {options.map((e, idx) =>
        e.hidden ? null : (
          <Menu.Item key={idx}>
            {({ active }) => (
              <div
                className={`flex gap-2 sm:gap-4 items-center px-4  py-1.5 font-bold text-[#333333]
                ${e.class || ""}
                ${
                  !!active ? `!text-primary ${e.activeClass}` : ""
                } cursor-pointer`}
                onClick={e.action}
              >
                <span className="flex text-[24px]">{e.icon}</span>
                <span>{e.title}</span>
              </div>
            )}
          </Menu.Item>
        ),
      )}
    </DropDown>
  )
}

export default TaskOptions

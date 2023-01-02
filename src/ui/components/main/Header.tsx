import React from "react"
import Button from "../common/Button"
import { Icon } from "@iconify-icon/react"

function Header({ title }: { title: string }) {
  return (
    <nav className="sticky top-0 flex gap-2 sm:gap-4 border-b-2 border-[#E0E0E0] px-5 py-[1.125rem] bg-white">
      <h1 className="font-bold text-xl">{title || "App Name"}</h1>
      <Button className="text-sm">
        <Icon icon="uil:plus" />
        Add New Group
      </Button>
    </nav>
  )
}

export default Header

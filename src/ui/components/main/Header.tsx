import React from "react"

function Header({ title }: { title: string }) {
  return (
    <nav className="sticky top-0 flex gap-2 sm:gap-4 border-b-2 border-[#E0E0E0] px-5 py-[1.125rem]">
      <span className="font-bold text-lg">{title || "App Name"}</span>
    </nav>
  )
}

export default Header

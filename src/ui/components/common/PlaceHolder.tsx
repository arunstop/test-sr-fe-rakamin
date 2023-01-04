import { ReactNode } from "react"

function PlaceHolder({ children }: { children: ReactNode }) {
  return (
    <span
      className={`border rounded px-4 py-2 gap-3 bg-[#FAFAFA] border-[#e0e0e0] flex flex-col text-md text-[#757575]`}
    >
      {children}
    </span>
  )
}

export default PlaceHolder

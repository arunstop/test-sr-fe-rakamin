import React from "react"
import { TType } from "../../../app/types/commons"
import { getTypeStyle } from "../../helpers/style"

function Label({ text, type }: { text: string; type: TType }) {
  const styleAll = getTypeStyle(type).all("bgMain")
  return (
    <span className={`border rounded px-2 text-xs py-0.5 ${styleAll}`}>
      {text}
    </span>
  )
}

export default Label

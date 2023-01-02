import React from "react"
import { TType } from "../../../core/data/commons"
import { getTypeStyle } from "../../helpers/style"

function Label({ text, type }: { text: string; type: TType }) {
  const style = getTypeStyle(type)
  return <span className={`border rounded px-2 text-xs py-0.5 ${style.all}`}>{text}</span>
}

export default Label

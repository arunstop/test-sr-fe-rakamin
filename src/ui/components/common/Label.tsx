import React from "react"
import { TType } from "../../../app/types/commons"
import { getTypeStyle } from "../../helpers/style"

function Label({ text, type }: { text: string; type?: TType }) {
  const styleAll = getTypeStyle(type || "primary").all("bgMain")
  return (
    <span className={`border rounded px-2 text-xs py-0.5 ${styleAll}`} data-cy="label">
      {text}
    </span>
  )
}

export default Label

import React from "react"
import { getTypeStyle } from "../../helpers/style"
import { TType } from "../../../core/data/commons"
import { Icon } from "@iconify-icon/react"

function ProgressBar({
  value,
  done,
}: {
  value: number | null
  done?: boolean
}) {
  const style = getTypeStyle(done ? "success" : !value?"danger":"primary")
  return (
    <div className="flex gap-4 flex-1 items-center">
      <div className="flex h-4 rounded-full flex-1 overflow-hidden bg-[#EDEDED]">
        <span
          className={` ${style.bgMain}`}
          style={{
            width: `${value ?? 40}%`,
          }}
        />
      </div>
      {/* if done */}
      {!!done && value == 100 && (
        <Icon icon="fe:check-circle" className={`text-lg ${style.text}`} />
      )}
      {/* if no value aka null */}
      {value == null && (
        <Icon icon="mdi:close-circle-outline" className={`text-lg ${style.text}`} />
      )}
      {/* if null*/}
      {!done && value && <span className="text-[#757575]">{value + "%"}</span>}
    </div>
  )
}

export default ProgressBar

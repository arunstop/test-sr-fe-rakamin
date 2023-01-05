import React from "react"
import { getTypeStyle } from "../../helpers/style"
import { TType } from "../../../app/types/commons"
import { Icon } from "@iconify-icon/react"

function ProgressBar({
  value,
  done,
}: {
  value: number | null
  done?: boolean
}) {
  const isDone = !!done || value == 100
  const style = getTypeStyle(isDone ? "success" : !value ? "danger" : "primary")
  return (
    <div className="flex gap-4 flex-1 items-center " data-cy="progress-bar">
      <div
        className="flex h-4 rounded-full flex-1 overflow-hidden bg-[#EDEDED]"
        data-cy="progress-bar-bar"
      >
        <span
          className={` ${style.bgMain}`}
          style={{
            width: `${value || 40}%`,
          }}
        />
      </div>
      {/* if done */}
      {(!!done || value == 100) && (
        <Icon
          icon="fe:check-circle"
          className={`text-lg ${style.text}`}
          data-cy="progress-bar-icon"
        />
      )}
      {/* if no value aka null */}
      {!value && (
        <Icon
          icon="mdi:close-circle-outline"
          className={`text-lg ${style.text}`}
          data-cy="progress-bar-icon"
        />
      )}
      {/* if null*/}
      {(!!value && !isDone) && (
        <span className="text-[#757575]" data-cy="progress-bar-value">
          {value + "%"}
        </span>
      )}
    </div>
  )
}

export default ProgressBar

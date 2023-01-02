import React from "react"
import { TType } from "../../../core/data/commons"
import { getTypeStyle } from "../../helpers/style"
import { ITask } from "../../../core/data/models/task"
import ProgressBar from "./ProgressBar"
import Button from "./Button"
import { Icon } from "@iconify-icon/react"

function TaskItem({
  task: {
    id,
    name,
    done,
    todo_id,
    created_at,
    updated_at,
    progress_percentage,
  },
}: {
  task: ITask
}) {
  return (
    <span
      className={`border rounded p-4 gap-3 bg-[#FAFAFA] border-[#e0e0e0] flex flex-col transition-all duration-200 
      hover:border-black hover:-translate-y-2`}
    >
      <span className="font-bold">{name}</span>
      <div className="h-[1px] border-b border-dashed w-full border-neutral-[#e0e0e0]"></div>
      <div className="flex gap-6">
        <ProgressBar value={progress_percentage} done={!!done} />
        <Button className="px-0 text-[1.5rem] bg-transparent text-[#757575] hover:!bg-[#EDEDED] rounded">
          <Icon icon="fe:elipsis-h" />
        </Button>
      </div>
    </span>
  )
}

export default TaskItem

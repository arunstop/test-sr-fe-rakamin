import React, { useState } from "react"
import { TType } from "../../../app/types/commons"
import { getTypeStyle } from "../../helpers/style"
import { ITask } from "../../../core/data/models/task"
import ProgressBar from "./ProgressBar"
import Button from "./Button"
import { Icon } from "@iconify-icon/react"
import ConfirmationModal from "./ConfirmationModal"
import DropDown from "./DropDown"
import TaskOptions, { ICardOption } from "./TaskOptions"
import { useTaskStore } from "../../../app/stores/task/TaskStore"

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
  const { deleteTask } = useTaskStore()
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  function closeDeleteModal() {
    setDeleteModal(false)
  }

  async function confirmDeleteTask() {
    await deleteTask({
      data: { taskId: id, todoId: todo_id },
      onLoading(message) {
        setLoading(true)
      },
      async onError(error) {
        alert(error)
      },
      onSuccess(data) {
        closeDeleteModal()
      },
    })
    setLoading(false)
  }

  const optionButton = (
    <Button className="px-0 text-[1.5rem] bg-transparent text-[#757575] hover:!bg-[#EDEDED] rounded">
      <Icon icon="fe:elipsis-h" />
    </Button>
  )

  const options: ICardOption[] = [
    {
      icon: <Icon icon="uil:arrow-left" />,
      title: "Move Left",
      action: () => {},
    },
    {
      icon: <Icon icon="uil:arrow-right" />,
      title: "Move Right",
      action: () => {},
    },
    { icon: <Icon icon="uil:edit-alt" />, title: "Edit", action: () => {} },
    {
      icon: <Icon icon="uil:trash-alt" />,
      title: "Delete",
      action: () => setDeleteModal(true),
    },
  ]

  return (
    <>
      <span
        className={`border rounded p-4 gap-3 bg-[#FAFAFA] border-[#e0e0e0] flex flex-col transition-all duration-200 
      hover:border-black hover:-translate-y-2 hover:z-10`}
      >
        <span className="font-bold">{name}</span>
        <div className="h-[1px] border-b border-dashed w-full border-neutral-[#e0e0e0]"></div>
        <div className="flex gap-6">
          <ProgressBar value={progress_percentage} done={!!done} />
          <TaskOptions trigger={optionButton} options={options} />
        </div>
      </span>
      <ConfirmationModal
        show={deleteModal}
        onClose={closeDeleteModal}
        title="Delete Task"
        type="danger"
        desc="Are you sure want to delete this task? your action can’t be reverted."
        ok={{ label: "Delete", action: confirmDeleteTask }}
        cancel={{ label: "Cancel", action: closeDeleteModal }}
      />
    </>
  )
}

export default TaskItem

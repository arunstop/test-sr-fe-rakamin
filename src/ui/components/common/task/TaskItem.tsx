import { Transition } from "@headlessui/react"
import { Icon } from "@iconify-icon/react"
import React, { useState } from "react"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import { useTodo } from "../../../../app/stores/todo/TodoHook"
import { TServiceTaskMoveDirection } from "../../../../app/types/stores/types-task"
import { ITask } from "../../../../core/data/models/task"
import Button from "../Button"
import { ICardDirection } from "../todo/TodoItem"
import ConfirmationModal from "../ConfirmationModal"
import ProgressBar from "../ProgressBar"
import TaskOptions, { ICardOption } from "./TaskOptions"
import TaskEditModal from "./TaskEditModal"
import { Card } from "../Card"

export interface ITaskItem {
  task: ITask
  direction: ICardDirection
  animDelay?: number
}

function TaskItem(props: ITaskItem) {
  const {
    task,
    task: {
      id,
      name,
      done,
      todo_id,
      created_at,
      updated_at,
      progress_percentage,
    },
    direction,
    animDelay,
  } = props
  const { moveTask, deleteTask } = useTaskStore()
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { state } = useTodo()

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

  async function exeMoveTask(dir: TServiceTaskMoveDirection) {
    let target = undefined
    if (dir === "LEFT") target = direction.left
    if (dir === "RIGHT") target = direction.right
    if (!target) return

    moveTask({
      data: {
        input: { name: name, progress_percentage: progress_percentage },
        taskId: id,
        todoId: todo_id,
        targetTodoId: target,
      },
      // direction: dir,
    })
  }

  const options: ICardOption[] = [
    {
      icon: <Icon icon="uil:arrow-left" />,
      title: "Move Left",
      hidden: !direction.left,
      action: () => exeMoveTask("LEFT"),
    },
    {
      icon: <Icon icon="uil:arrow-right" />,
      title: "Move Right",
      hidden: !direction.right,
      action: () => exeMoveTask("RIGHT"),
    },
    {
      icon: <Icon icon="uil:edit-alt" />,
      title: "Edit",
      class:"button-task-edit",
      action: () => setEditModal(true),
    },
    {
      icon: <Icon icon="uil:trash-alt" />,
      title: "Delete",
      class:"button-task-delete",
      activeClass: "!text-danger",
      action: () => setDeleteModal(true),
    },
  ]

  const optionButton = (
    <Button className="px-0 text-[1.5rem] bg-transparent text-[#757575] hover:!bg-[#EDEDED] rounded">
      <Icon icon="fe:elipsis-h" />
    </Button>
  )

  function handleDragStart(ev: React.DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text/plain", JSON.stringify(task))
  }

  return (
    <>
      <Transition
        show
        as={TaskItemContent}
        enter="transition-all pointer-events-none duration-300 ease-out"
        enterFrom="-translate-y-0 opacity-50 scale-x-50 blur-md"
        enterTo="-translate-y-[30%] opacity-100 scale-x-100 blur-none"
        entered="-translate-y-[0%]"
        leave="transition-all pointer-events-none duration-300 ease-in"
        leaveFrom="-translate-y-0 opacity-100 scale-x-100 blur-none"
        leaveTo="-translate-y-[30%] opacity-50 scale-x-50 blur-md"
        appear
        task={task}
        direction={direction}
        animDelay={animDelay}
        options={options}
      />
      <ConfirmationModal
        show={deleteModal}
        onClose={closeDeleteModal}
        title="Delete Task"
        type="danger"
        desc="Are you sure want to delete this task? your action can???t be reverted."
        ok={{ label: "Delete", action: confirmDeleteTask }}
        cancel={{ label: "Cancel", action: closeDeleteModal }}
      />
      <TaskEditModal
        show={editModal}
        onClose={() => setEditModal(false)}
        title={"Edit Task"}
        todoId={todo_id}
        taskId={id}
        input={{ name: name, progress_percentage: progress_percentage || 0 }}
      />
    </>
  )
}

const TaskItemContent = React.forwardRef<
  HTMLDivElement,
  ITaskItem & { options?: ICardOption[] }
>((props, ref) => {
  const { task, animDelay, options = [] } = props
  const optionButton = (
    <Button className="px-0 text-[1.5rem] bg-transparent text-[#757575] hover:!bg-[#EDEDED] rounded py-0">
      <Icon icon="fe:elipsis-h" />
    </Button>
  )

  function handleDragStart(ev: React.DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text/plain", JSON.stringify(task))
  }
  return (
    <Card
      ref={ref}
      className={` gap-[10px]  transition-all duration-200 hover:border-black hover:-translate-y-2 hover:z-10 
      cursor-grab focus-within:z-10`}
      style={{ transitionDelay: `${animDelay}ms` }}
      onDragStart={handleDragStart}
      draggable
      id={task.name}
      data-task={JSON.stringify(task)}
      data-cy={`task-item-${task.id}`}
    >
      <span className="font-bold">{task.name}</span>
      <div className="h-[1px] border-b border-dashed w-full border-neutral-[#e0e0e0]"></div>
      <div className="flex gap-6">
        <ProgressBar value={task.progress_percentage} done={!!task.done} />
        <TaskOptions trigger={optionButton} options={options} />
      </div>
    </Card>
  )
})

export default TaskItem

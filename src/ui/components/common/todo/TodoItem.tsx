import { Icon } from "@iconify-icon/react"
import React, { useCallback, useState } from "react"
import shallow from "zustand/shallow"
import { useTaskStore } from "../../../../app/stores/task/TaskStore"
import { TType } from "../../../../app/types/commons"
import { ITask } from "../../../../core/data/models/task"
import { ITodo } from "../../../../core/data/models/todo"
import { getTypeStyle } from "../../../helpers/style"
import Button from "../Button"
import { Card } from "../Card"
import Label from "../Label"
import TaskAddModal from "../task/TaskAddModal"
import TaskItem from "../task/TaskItem"

export interface ICardDirection {
  left?: number
  right?: number
}

function TodoItem(props: {
  todo: ITodo
  type: TType
  direction: ICardDirection
}) {
  const {
    todo: { id, title, description },
    type,
  } = props
  const style = getTypeStyle(type)
  const { moveTask } = useTaskStore()
  const [newModal, setNewModal] = useState(false)
  async function handleOnDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault()
    const data = ev.dataTransfer.getData("text/plain")
    if (!data) return
    const task = JSON.parse(data) as unknown as ITask
    await moveTask({
      data: {
        input: {
          name: task.name,
          progress_percentage: task.progress_percentage,
        },
        targetTodoId: id,
        taskId: task.id,
        todoId: task.todo_id,
      },
    })
  }

  return (
    <>
      <div
        className="flex items-start"
        onDragOver={(ev) => {
          ev.preventDefault()
        }}
        onMouseDown={(ev) => ev.stopPropagation()}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}
        // onDragEnd={handleDragEnd}
        onDrop={handleOnDrop}
        // onDragEnd={handleDragEnd}
        data-cy={`todo-item-${id}`}
      >
        <Card
          className={`bg-primary-bg gap-[0.5rem] w-full
          ${style.bg + style.border}`}
        >
          <div>
            <Label text={title} type={type} />
          </div>
          <div className="font-bold text-sm">{description}</div>
          {/* TODO: rendering a bit too much, please */}
          <ItemSection todoId={id} direction={props.direction} />
          <div className="flex h-min">
            <Button
              className="flex gap-[6.67px] items-center px-0 py-0 bg-transparent text-black"
              onClick={() => setNewModal(true)}
              data-cy="button-add-task-modal"
            >
              <Icon icon="uil:plus-circle" className="text-[16.67px]" />
              <span className="text-sm font-normal">New Task</span>
            </Button>
          </div>
        </Card>
      </div>
      <TaskAddModal
        show={newModal}
        onClose={() => setNewModal(false)}
        title={"Create Task"}
        todoId={id}
      />
    </>
  )
}

function ItemSection({
  todoId,
  direction,
}: {
  todoId: number
  direction: ICardDirection
}) {
  const data = useTaskStore((state) => [state.tasks.get(todoId)], shallow)
  const tasks = data[0] ? (data[0] as unknown as ITask[]) : null
  const sortedTasks = !tasks
    ? []
    : tasks.sort((a, b) => {
        const dateA = a.updated_at
        const dateB = b.updated_at
        if (dateA < dateB) {
          return -1
        }
        if (dateA > dateB) {
          return 1
        }

        // names must be equal
        return 0
      })
  // const [preview, setPreview] = useState<ITask>()
  // function handleDragEnter(ev: React.DragEvent<HTMLDivElement>) {
  //   ev.preventDefault()
  //   const attr = (ev.target as HTMLDivElement).getAttribute("data-task")
  //   if (!attr) return
  //   const task = JSON.parse(attr) as ITask
  //   // if(todoId === task.todo_id) return
  //   setPreview((old) => {
  //     if (old?.id === task.id) return old
  //     return task
  //   })
  // }
  // function handleDragLeave(ev: React.DragEvent<HTMLDivElement>) {
  //   // check if the dragging event leaving the wrapper
  //   // by disabling children's pointer events
  //   if (preview && (ev.target as HTMLDivElement).id === "drag-wrapper")
  //     return setPreview(undefined)
  // }

  // function handleDragEnd(ev: React.DragEvent<HTMLDivElement>) {
  //   // check if the dragging event leaving the wrapper
  //   const attr = (ev.target as HTMLDivElement).getAttribute("data-task")
  //   if (!attr) return
  //   const task = JSON.parse(attr) as ITask
  //   if(todoId === task.todo_id) return
  //   console.log("Capture",Date.now(),task)
  //   setPreview((old) => {
  //     if (old?.id === task.id) return undefined
  //     return task
  //   })
  // }

  return (
    <div
      className={`flex flex-col gap-[inherit] isolate `}
      data-cy="tasks-wrapper"
    >
      {sortedTasks.length ? (
        sortedTasks.map((e, idx) => {
          return (
            <TaskItem
              key={e.id}
              task={e}
              direction={direction}
              animDelay={100 + idx * 50}
            />
          )
        })
      ) : (
        <Card className="px-4 py-2 text-md text-[#757575]">No Task</Card>
      )}
      {/* {preview && (
        <div className=" bg-primary-main/50 [&>*]:opacity-50 rounded blur-sm">
          <TaskItem
            key={preview.id}
            task={preview}
            direction={direction}
            // animDelay={100 + idx * 50}
          />
        </div>
      )} */}
    </div>
  )
}

export default TodoItem

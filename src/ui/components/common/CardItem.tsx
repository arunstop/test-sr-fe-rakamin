import { Icon } from "@iconify-icon/react"
import React, { useCallback, useEffect, useState } from "react"
import shallow from "zustand/shallow"
import { useTaskStore } from "../../../app/stores/task/TaskStore"
import { TType } from "../../../app/types/commons"
import { ITask } from "../../../core/data/models/task"
import { ITodo } from "../../../core/data/models/todo"
import { getTypeStyle } from "../../helpers/style"
import Button from "./Button"
import Label from "./Label"
import TaskItem from "./TaskItem"
import CardAddModal from "./card/CardAddModal"
import PlaceHolder from "./PlaceHolder"

export interface ICardDirection {
  left?: number
  right?: number
}

function CardItem(props: {
  todo: ITodo
  type: TType
  direction: ICardDirection
}) {
  const {
    todo: { id, title, description },
    type,
  } = props
  const style = getTypeStyle(type)

  const [newModal, setNewModal] = useState(false)
  // TODO: rendering a bit too much, please
  const items = useCallback(
    () => <ItemSection todoId={id} direction={props.direction} />,
    [id],
  )
  return (
    <>
      <div className="flex items-start">
        <div
          className={`rounded border p-[0.75rem] bg-primary-bg flex flex-col 
        gap-[0.625rem] ${style.bg + style.border} w-full`}
        >
          <div>
            <Label text={title} type={type} />
          </div>
          <div className="font-bold text-sm">{description}</div>
          {items()}
          <div>
            <Button
              className="flex gap-[6.67px] items-center px-0 bg-transparent text-black"
              onClick={() => setNewModal(true)}
            >
              <Icon icon="uil:plus-circle" className="text-[16.67px]" />
              <span className="text-sm font-normal">New Task</span>
            </Button>
          </div>
        </div>
      </div>
      <CardAddModal
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
  const { moveTask } = useTaskStore()
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
        targetTodoId: todoId,
        taskId: task.id,
        todoId: task.todo_id,
      },
    })
  }

  // useEffect(() => {
  //   console.log(preview, Date.now())
  //   return () => {}
  // }, [preview])
  return (
    <div
      id="drag-wrapper"
      className={`flex flex-col gap-[inherit] isolate `}
      onDragOver={(ev) => {
        ev.preventDefault()
      }}
      // onDragEnter={handleDragEnter}
      // onDragLeave={handleDragLeave}
      // onDragEnd={handleDragEnd}
      onDrop={handleOnDrop}
      // onDragEnd={handleDragEnd}
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
        <PlaceHolder>No Task</PlaceHolder>
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

export default CardItem

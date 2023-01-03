import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { TType } from "../../../app/types/commons"
import { ITask } from "../../../core/data/models/task"
import { ITodo } from "../../../core/data/models/todo"
import { getTypeStyle } from "../../helpers/style"
import Button from "./Button"
import Label from "./Label"
import TaskItem from "./TaskItem"
import CardAddModal from "./card/CardAddModal"

function CardItem(props: { todo: ITodo; type: TType }) {
  const {
    todo: { title, description },
    type,
  } = props
  const style = getTypeStyle(type)

  const tasks: ITask[] = [
    {
      id: 1,
      name: "Re-design the zero-g doggie. No more spills",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: true,
      progress_percentage: 100,
    },
    {
      id: 2,
      name: "Bundle interplanetary analytics for improved transmission",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: null,
      progress_percentage: 30,
    },
    {
      id: 3,
      name: "Data Migration: Performance & Culture End Game",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: null,
      progress_percentage: 60,
    },
    {
      id: 4,
      name: "Bundle interplanetary analytics for improved transmission",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: null,
      progress_percentage: null,
    },
  ]
  const [newModal, setNewModal] = useState(false)

  return (
    <>
      <div
        className={`rounded border p-[0.75rem] bg-primary-bg flex flex-col 
        gap-[0.625rem] ${style.bg + style.border}`}
      >
        <div>
          <Label text={title} type={type} />
        </div>
        <div className="font-bold">{description}</div>
        <div className="flex flex-col gap-[inherit] isolate">
          {tasks.map((e) => {
            return <TaskItem key={e.id} task={e} />
          })}
        </div>
        <div >
          <Button
            className="flex gap-[6.67px] items-center px-0 bg-transparent text-black"
            onClick={() => setNewModal(true)}
          >
            <Icon icon="uil:plus-circle" className="text-[16.67px]" />
            <span className="text-sm font-normal">New Task</span>
          </Button>
        </div>
      </div>
      <CardAddModal
        show={newModal}
        onClose={() => setNewModal(false)}
        title={"Create Task"}
      />
    </>
  )
}

export default CardItem

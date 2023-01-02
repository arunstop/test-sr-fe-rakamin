import { TType } from "../../../core/data/commons"
import { ITask } from "../../../core/data/models/task"
import { ITodo } from "../../../core/data/models/todo"
import { getTypeStyle } from "../../helpers/style"
import Button from "./Button"
import { Icon } from "@iconify-icon/react"
import TaskItem from "./TaskItem"
import Label from "./Label"

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
      id: 2,
      name: "Data Migration: Performance & Culture End Game",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: null,
      progress_percentage: 60,
    },
    {
      id: 3,
      name: "Bundle interplanetary analytics for improved transmission",
      todo_id: 1,
      created_at: "",
      updated_at: "",
      done: null,
      progress_percentage: null,
    },
  ]
  return (
    <div
      className={`rounded border p-[0.75rem] bg-primary-bg flex flex-col 
      gap-[0.625rem] ${style.bg + style.border}`}
    >
      <div>
        <Label text={title} type={type} />
      </div>
      <div className="font-bold">{description}</div>
      <div className="flex flex-col gap-[inherit]">
        {tasks.map((e) => {
          return <TaskItem key={e.id} task={e} />
        })}
      </div>
      <div>
        <Button className="flex gap-[6.67px] items-center px-0 bg-transparent text-black">
          <Icon icon="uil:plus-circle" className="text-[16.67px]" />
          <span className="text-sm">New Task</span>
        </Button>
      </div>
    </div>
  )
}

export default CardItem

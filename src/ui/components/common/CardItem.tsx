import { Icon } from "@iconify-icon/react"
import { useCallback, useState } from "react"
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

function CardItem(props: { todo: ITodo; type: TType }) {
  const {
    todo: { id, title, description },
    type,
  } = props
  const style = getTypeStyle(type)

  const [newModal, setNewModal] = useState(false)
  // TODO: rendering a bit too much, please
  const items = useCallback(() => <ItemSection todoId={id} />, [id])
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
      <CardAddModal
        show={newModal}
        onClose={() => setNewModal(false)}
        title={"Create Task"}
        todoId={id}
      />
    </>
  )
}

function ItemSection({ todoId }: { todoId: number }) {
  const data = useTaskStore((state) => [state.tasks.get(todoId)], shallow)
  const tasks = data[0] ? (data[0] as unknown as ITask[]) : null
  return (
    <div className="flex flex-col gap-[inherit] isolate">
      {!!tasks &&
        tasks.map((e) => {
          return <TaskItem key={e.id} task={e} />
        })}
    </div>
  )
}

export default CardItem

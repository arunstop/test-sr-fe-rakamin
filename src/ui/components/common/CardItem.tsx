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
  const data = useTaskStore((state) => [state.tasks.get(todoId)], shallow)
  const tasks = data[0] ? (data[0] as unknown as ITask[]) : null
  return (
    <div className="flex flex-col gap-[inherit] isolate">
      {!!tasks?.length ? (
        tasks
          .sort((a, b) => {
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
          .map((e, idx) => {
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
    </div>
  )
}

export default CardItem

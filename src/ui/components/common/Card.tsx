import { TType } from "../../../core/data/commons"
import { ITodo } from "../../../core/data/models/todo"
import { getTypeStyle } from "../../helpers/style"
import Label from "./Label"

function Card(props: { todo: ITodo; type: TType }) {
  const {
    todo: { title },
    type,
  } = props
  const style = getTypeStyle(type)
  return (
    <div
      className={`rounded border p-[0.75rem] bg-primary-bg flex flex-col 
      gap-[0.625rem] ${style.bg+style.border}`}
    >
      <div>
        <Label text={title} type={type} />
      </div>
      <div>list of tasks</div>
      <span>new task</span>
    </div>
  )
}

export default Card

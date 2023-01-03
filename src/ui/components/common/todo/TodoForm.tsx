import { useState } from "react"
import { ITodoInput } from "../../../../app/types/states/types-todo"
import Button from "../Button"
import TextInput from "../TextInput"

function TodoForm({
  data,
  onEdit,
  onSubmit,
  onClose,
  loading,
}: {
  data: ITodoInput
  onSubmit: () => void
  onEdit: (data: ITodoInput) => void
  onClose: () => void
  loading?: boolean
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  return (
    <form
      className="flex flex-col gap-2 sm:gap-4 px-6"
      onSubmit={(ev) => {
        ev.preventDefault()
        onSubmit()
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <span className="text-sm font-bold">Title</span>
          <TextInput
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, title: ev.target.value })
            }}
          />
        </div>
        <div className="grid gap-2">
          <span className="text-sm font-bold">Description</span>
          <TextInput
            name="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, description: ev.target.value })
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-[0.625rem] py-6 w-full">
        <Button className=""  type="submit" loading={loading}>
          Save Task
        </Button>
        <Button
          className="border border-[#E0E0E0] bg-white text-black shadow-[0px_1px_2px] shadow-black/[0.12] order-first"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TodoForm

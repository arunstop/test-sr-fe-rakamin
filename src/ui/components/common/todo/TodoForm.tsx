import { useState } from "react"
import { ITodoInput } from "../../../../app/types/stores/types-todo"
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
  onSubmit: (data: ITodoInput) => void
  onEdit: (data: ITodoInput) => void
  onClose: () => void
  loading?: boolean
}) {
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)

  return (
    <form
      className="flex flex-col gap-2 sm:gap-4 px-6"
      onSubmit={(ev) => {
        ev.preventDefault()
        onSubmit({ title: title, description: description })
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <span className="text-sm font-bold">Title</span>
          <TextInput
            name="name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, title: ev.target.value })
            }}
            placeholder="Type your Todo name"
            data-cy="input-todo-name"
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
            placeholder="Type your Description"
            data-cy="input-todo-description"
          />
        </div>
      </div>
      <div className="flex justify-end gap-[0.625rem] py-6 w-full">
        <Button
          id="button-add-todo"
          className=""
          type="submit"
          loading={loading}
        >
          Save Task
        </Button>
        <Button
          className="border border-[#E0E0E0] bg-white text-black shadow-[0px_1px_2px] shadow-black/[0.12] order-first"
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TodoForm

import React, { useState } from "react"
import Button from "../Button"
import TextInput from "../TextInput"
import { ITaskInput } from "../../../../app/types/stores/types-task"

function CardForm({
  data,
  onEdit,
  onSubmit,
  onClose,
  loading,
}: {
  data: ITaskInput
  onSubmit: () => void
  onEdit: (data: ITaskInput) => void
  onClose: () => void
  loading: boolean
}) {
  const [name, setName] = useState(data.name)
  const [progress, setProgress] = useState(data.progress_percentage)
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
          <span className="text-sm font-bold">Task Name</span>
          <TextInput
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            onBlur={(ev) => {
              onEdit({ ...data, name: ev.target.value })
            }}
          />
        </div>
        <div className="grid gap-2">
          <span className="text-sm font-bold">Progress</span>
          <TextInput
            name="progress"
            value={progress}
            onChange={(ev) => {
              if (!ev.target.value) return
              const val = parseInt(ev.target.value) * 1
              if (val < 0) return
              if (val > 100) return
              return setProgress(val)
            }}
            className="w-[40%]"
            type="number"
            min={0}
            max={100}
            onBlur={(ev) => {
              onEdit({ ...data, progress_percentage: parseInt(ev.target.value) })
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-[0.625rem] py-6 w-full">
        <Button className="" type="submit" loading={loading}>
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

export default CardForm

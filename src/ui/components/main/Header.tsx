import React, { useState } from "react"
import Button from "../common/Button"
import { Icon } from "@iconify-icon/react"
import { serviceTodoAdd } from "../../../app/services/service-todo"
import { useTodo } from "../../../app/states/todo/TodoHook"

function Header({ title }: { title: string }) {
  const { state, action } = useTodo()
  const [error, setError] = useState("")
  async function addTodo() {
    await action.addTodo({
      data: {
        input: { title: "Hard task", description: "August - September" },
      },
      onError(error) {
        setError(error)
      },
    })
  }
  return (
    <nav className="sticky top-0 flex gap-2 sm:gap-4 border-b-2 border-[#E0E0E0] px-5 py-[1.125rem] bg-white z-10">
      <h1 className="font-bold text-xl">{title || "App Name"}</h1>
      <Button className="text-sm" onClick={() => addTodo()}>
        <Icon icon="uil:plus" />
        Add New Group {state.data.length}
      </Button>
      {error}
    </nav>
  )
}

export default Header

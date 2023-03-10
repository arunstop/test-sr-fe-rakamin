import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import Button from "../common/Button"
import TodoAddModal from "../common/todo/TodoAddModal"

function Header({ title }: { title: string }) {
  const [addModal, setAddModal] = useState(false)

  return (
    <>
      <nav
        className="sticky top-0 flex gap-2 sm:gap-4 border-b-2 border-[#E0E0E0] px-5 py-[1.125rem] bg-white z-10"
        data-cy="header"
      >
        <h1 className="font-bold text-xl">{title || "App Name"}</h1>
        <Button className="text-sm" onClick={() => setAddModal(true)} data-cy="button-add-todo-modal">
          <Icon icon="uil:plus" />
          Add New Group
        </Button>
      </nav>
      <TodoAddModal
        show={addModal}
        onClose={() => setAddModal(false)}
        title="Create Todo"
      ></TodoAddModal>
    </>
  )
}

export default Header

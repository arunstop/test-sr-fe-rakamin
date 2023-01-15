import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import Button from "../common/Button"
import TodoAddModal from "../common/todo/TodoAddModal"
import { useAuthStore } from "../../../app/stores/auth/AuthStore."
import { redirect, useNavigate } from "react-router-dom"

function Header({ title }: { title: string }) {
  const [addModal, setAddModal] = useState(false)
  const { email, logout } = useAuthStore()
const navigate = useNavigate()
  return (
    <>
      <nav
        className="sticky top-0 flex gap-2 sm:gap-4 border-b-2 border-[#E0E0E0] px-5 py-[1.125rem] bg-white z-10"
        data-cy="header"
      >
        <h1 className="font-bold text-xl">{title || "App Name"}</h1>
        <Button
          className="text-sm"
          onClick={() => setAddModal(true)}
          data-cy="button-add-todo-modal"
        >
          <Icon icon="uil:plus" />
          Add New Group
        </Button>
        <div className="ml-auto flex gap-2 sm:gap-4">
          {!email ? (
            <Button
              className="text-sm"
              onClick={() => navigate('/auth')}
              data-cy="button-logout"
            >
              Login
            </Button>
          ) : (
            <>
              <span className="font-bold text-lg">{email}</span>
              <Button
                className="text-sm"
                onClick={() => logout({ data: "" })}
                data-cy="button-logout"
              >
                Logout
              </Button>
            </>
          )}
        </div>
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

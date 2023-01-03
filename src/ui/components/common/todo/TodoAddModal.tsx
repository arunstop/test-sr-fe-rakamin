import { useCallback, useState } from "react"
import { useTodo } from "../../../../app/stores/todo/TodoHook"
import { ITodoInput } from "../../../../app/types/stores/types-todo"
import Modal, { IModalProps } from "../Modal"
import TodoForm from "./TodoForm"

function TodoAddModal({ ...modalProps }: IModalProps) {
  const [data, setData] = useState<ITodoInput>({ title: "", description: "" })
  const { state, action } = useTodo()
  const [loading, setLoading] = useState(false)
  const addTodo = useCallback(async (data: ITodoInput) => {
    console.log(Date.now())
    if (loading) return
    await action.addTodo({
      data: {
        input: data,
      },
      onLoading(message) {
        setLoading(true)
      },
      onError(error) {
        alert(error)
      },
      onSuccess(data) {
        modalProps.onClose()
      },
    })
    setLoading(false)
    setData({ title: "", description: "" })
  }, [])

  function onEdit(data: ITodoInput) {
    setData(data)
  }
  function onSubmit() {
    addTodo(data)
    // setLoading(true)
    // new Promise(() =>
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 3000),
    // )
  }
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col">
        <TodoForm
          data={data}
          onEdit={onEdit}
          onClose={modalProps.onClose}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </Modal>
  )
}

export default TodoAddModal

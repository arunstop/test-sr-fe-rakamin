import React, { useCallback, useRef, useState } from "react"
import LayoutMain from "../layouts/LayoutMain"
import TodoItem, { ICardDirection } from "../components/common/todo/TodoItem"
import { TType } from "../../app/types/commons"
import { useTodo } from "../../app/stores/todo/TodoHook"
import { ITodo } from "../../core/data/models/todo"
import { useAuthStore } from "../../app/stores/auth/AuthStore."

function PageIndex() {
  const { state } = useTodo()

  function getDirection(todo: ITodo): ICardDirection {
    const idx = state.data.indexOf(todo)
    // getting left todo
    const left =
      idx > 0 && idx < state.data.length ? state.data[idx - 1].id : undefined
    // right todo
    const right =
      idx < state.data.length - 1 ? state.data[idx + 1].id : undefined
    return {
      left: left,
      right: right,
    }
  }

  const getType = useCallback((n: number): TType => {
    if (n % 4 == 0) return "success"
    else if (n % 3 == 0) return "danger"
    else if (n % 2 == 0) return "secondary"
    else if (n % 1 == 0) return "primary"
    return "primary"
  }, [])

  const ref = useRef<HTMLElement | null>(null)
  const dragScroll = useDragScroll(ref)
  const { email } = useAuthStore()
  const todos = state?.data && !!email ? state.data : []
  return (
    <LayoutMain>
      <main
        className="p-6 flex [&>*]:flex-none flex-1 [&>*]:w-[326px]  gap-4 max-w-screen overflow-auto items-start"
        data-cy="wrapper-todos"
        ref={(e) => {
          ref.current = e
        }}
        {...dragScroll}
      >
        <>
          {todos.map((v, idx) => {
            return (
              <TodoItem
                key={idx}
                todo={v}
                type={getType(idx + 1)}
                direction={getDirection(v)}
              />
            )
          })}
        </>
      </main>
    </LayoutMain>
  )
}

const useDragScroll = <EL extends HTMLElement>(
  ref: React.RefObject<EL | null>,
) => {
  const el = ref.current
  const [pos, setPos] = useState<{
    // scrolling distance of the element
    elLeft: number
    elTop: number
    // mouse location
    mouseX: number
    mouseY: number
    isScrolling: boolean
  }>({
    elLeft: 0,
    elTop: 0,
    mouseX: 0,
    mouseY: 0,
    isScrolling: false,
  })

  function setCursorStyle(scrolling: boolean) {
    if (!el) return
    if (scrolling) {
      el.style.cursor = "grabbing"
      el.style.userSelect = "none"
      return
    }
    el.style.cursor = "default"
    el.style.userSelect = "auto"
  }

  function onMouseDown(ev: React.MouseEvent) {
    if (!el) return
    setPos({
      // scrolling distance of the element
      elLeft: el.scrollLeft,
      elTop: el.scrollTop,
      // mouse location
      mouseX: ev.clientX,
      mouseY: ev.clientY,
      isScrolling: true,
    })
    setCursorStyle(true)
  }

  function onMouseUp(ev: React.MouseEvent) {
    if (!el) return
    setPos({ ...pos, isScrolling: false })
    setCursorStyle(false)
  }

  function onMouseMove(ev: React.MouseEvent) {
    if (!el || !pos.isScrolling) return
    const dx = ev.clientX - pos.mouseX
    const dy = ev.clientY - pos.mouseY
    el.scrollLeft = pos.elLeft - dx
    el.scrollTop = pos.elTop - dy
  }

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove,
  }
}

export default PageIndex

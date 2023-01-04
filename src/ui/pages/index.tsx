import React, { useCallback } from "react"
import LayoutMain from "../layouts/LayoutMain"
import CardItem, { ICardDirection } from "../components/common/CardItem"
import { TType } from "../../app/types/commons"
import { useTodo } from "../../app/stores/todo/TodoHook"
import { ITodo } from "../../core/data/models/todo"

function index() {
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
  return (
    <LayoutMain>
      <div className="p-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <>
            {state.data.map((v, idx) => {
              return (
                <CardItem
                  key={idx}
                  todo={v}
                  type={getType(idx+1)}
                  direction={getDirection(v)}
                />
              )
            })}
          </>
        </div>
      </div>
    </LayoutMain>
  )
}

export default index

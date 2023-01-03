import React from "react"
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
    const right = idx < state.data.length-1 ? state.data[idx+1].id : undefined
    return {
      left: left,
      right: right,
    }
  }
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
                  type={"primary"}
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

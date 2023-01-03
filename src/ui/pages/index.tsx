import React from "react"
import LayoutMain from "../layouts/LayoutMain"
import CardItem from "../components/common/CardItem"
import { TType } from "../../app/types/commons"
import { useTodo } from "../../app/states/todo/TodoHook"

function index() {
  const {state} = useTodo()
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

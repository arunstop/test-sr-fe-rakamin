import React from "react"
import LayoutMain from "../layouts/LayoutMain"
import Card from "../components/common/Card"
import { TType } from "../../core/data/commons"

function index() {
  const cards: TType[] = [
    "main",
    "secondary",
    "danger",
    "success",
    "main",
    "secondary",
    "danger",
    "success",
  ]
  return (
    <LayoutMain>
      <div className="p-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <>
            {cards.map((v, idx) => {
              return (
                  <Card
                    key={idx}
                    todo={{ id: idx, title: v.toUpperCase() + " " + idx }}
                    type={v}
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

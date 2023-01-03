import React from "react"
import LayoutMain from "../layouts/LayoutMain"
import CardItem from "../components/common/CardItem"
import { TType } from "../../app/types/commons"

function index() {
  const cards: TType[] = [
    "primary",
    "secondary",
    "danger",
    "success",
    "primary",
    "secondary",
    "danger",
    "success",
  ]
  return (
    <LayoutMain>
      <div className="p-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <>
            {cards.map((v, idx) => {
              return (
                <CardItem
                  key={idx}
                  todo={{
                    id: idx,
                    title: v.toUpperCase() + " " + idx,
                    description: "something",
                  }}
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

import React from "react"
import Button from "../Button"

function CardForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="flex flex-col gap-2 sm:gap-4 px-6">
      <div className="grid gap-4">
      <div className="grid gap-2">
        <span>Task Name</span>
        <input />
      </div>
      <div className="grid gap-2">
        <span>Progress</span>
        <input className="w-[40%]"/>
      </div></div>
      <div className="flex justify-end gap-[0.625rem] py-6 w-full">
        <Button className="" onClick={onClose}>
          Okay
        </Button>
        <Button className="border border-[#E0E0E0] bg-white text-black shadow-[0px_1px_2px] shadow-black/[0.12] order-first">
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CardForm

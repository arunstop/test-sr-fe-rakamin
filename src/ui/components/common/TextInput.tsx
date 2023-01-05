import React from "react"

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`bg-white text-[#404040] border-[#EDEDED] px-4 py-2 rounded-lg border-2 ${props.className}`}
    />
  )
})

export default TextInput

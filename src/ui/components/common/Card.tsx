import React, { DetailedHTMLProps, HTMLAttributes } from "react"

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`border rounded p-4 bg-[#FAFAFA] border-[#e0e0e0] flex flex-col transition-all duration-200 
      ${props.className}`}
    />
  )
})

import React from "react"

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}) {
  return (
    <button
      {...props}
      className={`flex gap-1 rounded-lg items-center px-4 text-white bg-primary-main transition-all duration-200
      hover:-translate-y-1 active:scale-95 active:translate-y-1 ease-in-out
      ${props.className}`}
    >
      {children}
    </button>
  )
}

export default Button

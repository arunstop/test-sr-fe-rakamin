import { Icon } from "@iconify-icon/react"
import React, { useEffect, useState } from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    loadingFor?: number
    children: React.ReactNode
  }
>(({ children, loadingFor, loading, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(loading)
  // listen for isLoading change to decide loading state
  useEffect(() => {
    // if button has loading state, it means the loading state is controlled by the parents
    if (loading) return
    if (loadingFor === undefined) return
    if (!isLoading) return
    // initiating timeout
    let timeout = 0
    // wait for x
    new Promise(
      () =>
        (timeout = setTimeout(() => {
          setIsLoading(false)
        }, loadingFor)),
    )
    return () => {
      // clear if element is destroyed
      clearTimeout(timeout)
    }
  }, [isLoading])

  // listen to parent controlled loading state
  useEffect(() => {
    if (loading) return
    setIsLoading(false)
    return () => {}
  }, [loading])

  return (
    <button
      ref={ref}
      data-cy="btn"
      {...props}
      className={`flex gap-1 rounded-lg items-center justify-center px-4 text-white bg-primary-main transition-all duration-200
      hover:-translate-y-1 active:scale-95 active:translate-y-1 ease-in font-bold py-1 relative isolate
      ${props.className}
      ${
        isLoading || loading
          ? "pointer-events-none scale-90 bg-opacity-30 select-none"
          : ""
      }
      `}
      onClick={(ev) => {
        props.onClick?.(ev)
        if (!loadingFor) return
        setIsLoading(true)
      }}
      disabled={!!isLoading || loading}
    >
      {(!!isLoading || loading) && (
        <span
          className="absolute m-auto inset-0 text-black  flex flex-1 w-full z-[10] bg-[#e0e0e0]/10 
          rounded-[inherit] backdrop-blur-sm"
        >
          <Icon
            icon="eos-icons:loading"
            className="m-auto  text-md"
            data-cy="btn-loading-spinner"
          />
        </span>
      )}
      {children}
    </button>
  )
})

export default Button

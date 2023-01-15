import React, { ReactNode } from "react"

function LayoutAuth({ children }: { children?: ReactNode }) {
  return <main className="flex flex-col min-h-screen justify-center items-center">{children}</main>
}

export default LayoutAuth

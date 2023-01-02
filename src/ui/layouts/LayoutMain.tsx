import React from "react"
import Header from "../components/main/Header"

function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header title="Product Roadmap" />
      {children}
    </div>
  )
}

export default LayoutMain

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./ui/pages/index"
import "./index.css"
import TodoProvider from "./app/stores/todo/TodoProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
)

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import TodoProvider from "./app/stores/todo/TodoProvider"
import "./index.css"
import App from "./ui/pages/index"

// // middleware to redirect `/` to `/v1`
// if (!(window.location.href + "/").includes(`${window.location.origin}/v1/`)) {
//   window.history.replaceState("", "", "/v1" + window.location.pathname)
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="v1">
      <Routes>
        <Route
          path="/"
          element={
            <TodoProvider>
              <App />
            </TodoProvider>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

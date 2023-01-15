import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import TodoProvider from "./app/stores/todo/TodoProvider"
import "./index.css"
import App from "./ui/pages/index"
import Auth from "./ui/pages/auth"
import { AuthProvider } from "./app/stores/auth/AuthStore."

// middleware to redirect `/` to `/v1`
if (!(window.location.href + "/").includes(`${window.location.origin}/v1/`)) {
  window.history.replaceState("", "", "/v1" + window.location.pathname)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter basename="v1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  </React.StrictMode>,
)

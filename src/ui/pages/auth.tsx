import React from "react"
import LayoutAuth from "../layouts/LayoutAuth"
import AuthPanel from "../components/auth/AuthPanel"
import { useAuthStore } from "../../app/stores/auth/AuthStore."
import { Navigate } from "react-router-dom"

function auth() {
  const { email } = useAuthStore()
  return (
    <>
      {!!email && <Navigate to="/" replace={true} />}
      <LayoutAuth>
        <AuthPanel />
      </LayoutAuth>
    </>
  )
}

export default auth

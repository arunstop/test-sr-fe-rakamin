import React from "react"
import LayoutAuth from "../layouts/LayoutAuth"
import AuthPanel from "../components/auth/AuthPanel"

function auth() {
  return (
    <LayoutAuth>
      <AuthPanel />
    </LayoutAuth>
  )
}

export default auth

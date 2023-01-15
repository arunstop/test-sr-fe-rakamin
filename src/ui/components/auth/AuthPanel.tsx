import { useState } from "react"
import { Card } from "../common/Card"
import AuthForm, { IAuthInput } from "./AuthForm"
import { useAuthStore } from "../../../app/stores/auth/AuthStore."

function AuthPanel() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IAuthInput>({ email: "", password: "" })
  const { email,login } = useAuthStore()
  function handleEdit(data: IAuthInput) {
    setData(data)
  }
  async function handleSubmit(data: IAuthInput) {
    if (loading) return
    setLoading(true)
    setData(data)
    await login({
      data: {
        email: data.email,
        password: data.password,
      },
      onSuccess(data) {
        console.log("login result", data)
      },
      onError(data) {
        console.log("login result", data)
      },
    })
    setLoading(false)
  }

  return (
    <Card className="flex-flex-col items-center">
    {email}
      <header className="text-lg font-bold">Login</header>
      <AuthForm
        data={data}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {/* <AuthForm
        data={data}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
        loading={loading}
        type="REGISTER"
      /> */}
      <footer></footer>
    </Card>
  )
}

export default AuthPanel

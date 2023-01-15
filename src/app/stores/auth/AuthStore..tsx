import Cookies from "js-cookie"
import { ReactNode, useEffect } from "react"
import create from "zustand"
import createContext from "zustand/context"
import { serviceAuthLogin } from "../../services/service-auth"
import { IStoreAuth } from "../../types/stores/types-auth"
import { validationIsEmail } from "../../../ui/helpers/helper-form"

const { Provider, useStore } = createContext()

export const useAuthStore = create<IStoreAuth>()((set, get) => ({
  email: "",
  async init(props) {
    set((old) => ({ ...old, email: props.email }))
  },
  async register(props) {
    set((old) => {
      return { ...old }
    })
  },
  async login(props) {
    const res = await serviceAuthLogin(props)
    if (!res) return
    set((old) => {
      return { ...old, email: props.data.email }
    })
    Cookies.set("auth_token", res.auth_token, { path: "/" })
    Cookies.set("email", props.data.email, { path: "/" })
  },
  async logout(props) {
    Cookies.remove("auth_token")
    Cookies.remove("email")
    set((old) => {
      return { ...old, email: "" }
    })
  },
}))

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { init } = useAuthStore()
  useEffect(() => {
    const emailCookie = Cookies.get("email")
    const authTokenCookie = Cookies.get("auth_token")
    if (!emailCookie || !authTokenCookie) return
    if (!validationIsEmail(emailCookie)) return
    init({ email: emailCookie })
    return () => {}
  }, [])

  return <Provider createStore={() => useAuthStore}>{children}</Provider>
}

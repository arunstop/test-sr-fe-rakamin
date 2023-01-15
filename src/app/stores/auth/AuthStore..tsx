import create from "zustand"
import createContext from "zustand/context"
import { devtools, persist } from "zustand/middleware"
import { IStoreAuth, IStoreAuthState } from "../../types/stores/types-auth"
import { serviceAuthLogin } from "../../services/service-auth"
import { ReactNode } from "react"
import Cookies from "js-cookie"

const { Provider, useStore } = createContext()

export const useAuthStore = create<IStoreAuth>()((set, get) => ({
  email: "1231231",
  async register(props) {
    set((old) => {
      return { ...old }
    })
  },
  async login(props) {
    const res = await serviceAuthLogin(props)
    if (!res) return
    set((old) => {
      return { ...old }
    })
    Cookies.set("auth_token", res.auth_token, { path: "/" })
    Cookies.set("email", props.data.email, { path: "/" })
  },
  async logout(props) {
    set((old) => {
      return { ...old, email: "" }
    })
  },
}))

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <Provider createStore={() => useAuthStore}>{children}</Provider>
)
import create from "zustand"
import { IStoreAuth, IStoreAuthState } from "../../types/stores/types-auth"
import { serviceAuthLogin } from "../../services/service-auth"

export const useAuthStore = create<IStoreAuth>((set) => ({
  email: "",
  register(props) {
    set((old) => {
      return { ...old }
    })
  },
  async login(props) {
    const res = await serviceAuthLogin(props)
    console.log(res)
    if (!res) return
    set((old) => {
      return { ...old }
    })
  },
  logout(props) {
    set((old) => {
      return { ...old, email: "" }
    })
  },
}))

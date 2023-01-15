import { TRepoAuthLoginProps, TRepoAuthRegisterProps } from "../../app/types/stores/types-auth"
import { API_BASE_URL } from "../clients/api-todo"
const api = API_BASE_URL
export async function repoAuthRegister(props: TRepoAuthRegisterProps) {
  return fetch(api + `/signup`, {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function repoAuthLogin(props: TRepoAuthLoginProps) {
    return fetch(api + `/auth/login`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

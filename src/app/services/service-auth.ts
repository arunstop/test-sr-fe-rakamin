import { IAuth } from "./../../core/data/models/auth"
import { repoAuthLogin, repoAuthRegister } from "../../core/repos/repo-auth"
import { TServiceAuthLogin, TServiceAuthRegister } from "./../types/stores/types-auth"

export async function serviceAuthRegister({
  data,
  onLoading,
  onError,
  onSuccess,
}: TServiceAuthRegister): Promise<IAuth | null> {
  await onLoading?.("Registering your information...")
  try {
    const resp = await repoAuthRegister(data)
    if (!resp.ok) throw new Error((await resp.json()).message)
    const result = (await resp.json()) as unknown as IAuth
    await onSuccess?.(result)
    return result
  } catch (error) {
    console.log(error)
    await onError?.((error as Error).message)
    return null
  }
}

export async function serviceAuthLogin({
    data,
    onLoading,
    onError,
    onSuccess,
  }: TServiceAuthLogin): Promise<IAuth | null> {
    await onLoading?.("Logging in...")
    try {
      const resp = await repoAuthLogin(data)
      if (!resp.ok) throw new Error((await resp.json()).message)
      const result = (await resp.json()) as unknown as IAuth
      await onSuccess?.(result)
      return result
    } catch (error) {
      console.log(error)
      await onError?.((error as Error).message)
      return null
    }
  }

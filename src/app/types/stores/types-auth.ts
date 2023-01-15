import { IAuth } from "./../../../core/data/models/auth"
import { IAuthInput } from "./../../../ui/components/auth/AuthForm"
import { IServiceReq } from "./../service"
export interface IStoreAuthState {
  email: string
}

// repo
export type TRepoAuthParams<IN, OUT = IAuth> = IServiceReq<IN, OUT>

export type TRepoAuthLoginProps = Pick<IAuthInput, "email" | "password">

export type TRepoAuthRegisterProps = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

//
export type TServiceAuthLogin = TRepoAuthParams<TRepoAuthLoginProps>
export type TServiceAuthRegister = TRepoAuthParams<TRepoAuthRegisterProps>
export type TServiceAuthLogout = TRepoAuthParams<string>
//

// stores
export interface IStoreAuthAction {
  login(props: TServiceAuthLogin): void | Promise<void>
  register(props: TServiceAuthRegister): void | Promise<void>
  logout(props: TServiceAuthLogout): void | Promise<void>
}

export type IStoreAuth = IStoreAuthState & IStoreAuthAction
//

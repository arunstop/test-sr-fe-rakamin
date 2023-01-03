export type TType = "primary" | "secondary" | "danger" | "success"

export interface IContextProps<STATE,ACTION>{
    state:STATE,
    action:ACTION
}

export interface IApiToken{
    token:string
}
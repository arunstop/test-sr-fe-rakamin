export interface IServiceReq<PARAM, DATA_OUT> {
  data:PARAM
  onLoading?(message: string): Promise<void>|void
  onSuccess?(data: DATA_OUT): Promise<void>|void
  onError?(error: string): Promise<void>|void
}

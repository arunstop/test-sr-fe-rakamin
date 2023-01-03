export interface IServiceReq<PARAM, DATA_OUT> {
  data:PARAM
  onLoading?(message: string): void
  onSuccess?(data: DATA_OUT): void
  onError?(error: string): void
}

export interface SuccessResponse<T> {
  status: 'success'
  data: T
}

export interface ErrorResponse {
  status: 'error'
  message: string
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export const successResponse = <T>(data: T): SuccessResponse<T> => ({
  status: 'success',
  data,
})

import type { SuiteScriptError } from 'N/error'
import { ErrorType, isErrorType } from './error'

export interface SuccessResponse<T> {
  status: 'success'
  data: T
}

export interface ErrorResponse {
  status: ErrorType
  message: string
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export const successResponse = <T>(data: T): SuccessResponse<T> => ({
  status: 'success',
  data,
})

const isSuiteScriptError = (error: unknown): error is SuiteScriptError => {
  if (typeof error !== 'object' || error == null) {
    return false
  }
  return (
    'id' in error && 'message' in error && 'name' in error && 'stack' in error
  )
}

export const errorResponse = (error: unknown): ErrorResponse => {
  if (isSuiteScriptError(error)) {
    return {
      status: isErrorType(error.name)
        ? error.name
        : ErrorType.InternalServerError,
      message: error.message,
    }
  }
  if (error instanceof Error) {
    return {
      status: ErrorType.InternalServerError,
      message: error.message,
    }
  }
  if (typeof error === 'string') {
    return {
      status: ErrorType.InternalServerError,
      message: error,
    }
  }
  return {
    status: ErrorType.InternalServerError,
    message: 'Unexpected error',
  }
}

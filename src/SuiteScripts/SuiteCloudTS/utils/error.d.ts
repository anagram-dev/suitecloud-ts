import type { SuiteScriptError } from 'N/error'
export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType]
export declare const ErrorType: {
  readonly NotFound: 'not_found'
  readonly BadRequest: 'bad_request'
  readonly InternalServerError: 'internal_server_error'
}
export interface ErrorOptions {
  message: string
}
export declare const isErrorType: (value: unknown) => value is ErrorType
export declare const notFoundError: ({
  message,
}: ErrorOptions) => SuiteScriptError
export declare const badRequestError: ({
  message,
}: ErrorOptions) => SuiteScriptError
export declare const internalServerErrorError: ({
  message,
}: ErrorOptions) => SuiteScriptError

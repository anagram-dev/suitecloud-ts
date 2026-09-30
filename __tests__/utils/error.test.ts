import error from 'N/error'
import {
  ErrorType,
  badRequestError,
  internalServerErrorError,
  isErrorType,
  notFoundError,
} from '../../src/SuiteScripts/utils/error'

jest.mock('N/error')

describe('isErrorType', () => {
  it('should accept a known error type', () => {
    expect(isErrorType(ErrorType.BadRequest)).toBe(true)
  })

  it('should reject anything else', () => {
    expect(isErrorType('foobar')).toBe(false)
    expect(isErrorType(undefined)).toBe(false)
  })
})

describe('error creators', () => {
  it.each([
    [ErrorType.NotFound, notFoundError, 'Not found: foobar'],
    [ErrorType.BadRequest, badRequestError, 'Bad request: foobar'],
    [
      ErrorType.InternalServerError,
      internalServerErrorError,
      'Internal server error: foobar',
    ],
  ])('should create a SuiteScriptError named %s', (name, create, message) => {
    create({ message: 'foobar' })
    expect(error.create).toHaveBeenCalledWith({ name, message })
  })
})

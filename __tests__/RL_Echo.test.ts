import error from 'N/error'
import log from 'N/log'
import runtime from 'N/runtime'
import { get, post } from '../src/SuiteScripts/RL_Echo'
import { ErrorType } from '../src/SuiteScripts/utils/error'

jest.mock('N/error')
jest.mock('N/log')
jest.mock('N/runtime')

beforeEach(() => {
  jest.mocked(error.create).mockImplementation(({ name, message }) => ({
    id: '1',
    name,
    message: String(message),
    stack: [],
    cause: undefined,
  }))
})

describe('RL_Echo', () => {
  it('should echo the params on get', () => {
    const params = { foo: 'bar' }

    expect(get(params)).toEqual({ status: 'success', data: { params } })
    expect(runtime.getCurrentUser).toHaveBeenCalled()
    expect(log.audit).toHaveBeenCalled()
  })

  it('should echo a valid body on post', () => {
    expect(post({ echo: true })).toEqual({
      status: 'success',
      data: { body: { echo: true } },
    })
  })

  it('should reject an invalid body on post', () => {
    expect(post({ echo: false })).toMatchObject({
      status: ErrorType.BadRequest,
    })
  })
})

/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */

import type { EntryPoints } from 'N/types'
import log from 'N/log'
import runtime from 'N/runtime'
import { badRequestError } from './utils/error'
import { successResponse, Response, errorResponse } from './utils/response'
import z from './lib/zod'

type Data = Record<string, unknown>

const PayloadSchema = z.object({
  echo: z.literal(true),
})

const logUser = () => {
  log.audit({
    title: 'RL_Echo requesting user',
    details: runtime.getCurrentUser(),
  })
}

export const get: EntryPoints.RESTlet.get<Data, Response<Data>> = (params) => {
  logUser()
  return successResponse({ params })
}

export const post: EntryPoints.RESTlet.post<Data, Response<Data>> = (body) => {
  logUser()
  const result = PayloadSchema.safeParse(body)
  if (!result.success) {
    return errorResponse(
      badRequestError({ message: z.prettifyError(result.error) }),
    )
  }
  return successResponse({ body })
}

export const put: EntryPoints.RESTlet.put<Data, Response<Data>> = (body) => {
  logUser()
  const result = PayloadSchema.safeParse(body)
  if (!result.success) {
    return errorResponse(
      badRequestError({ message: z.prettifyError(result.error) }),
    )
  }
  return successResponse({ body })
}

const delete_: EntryPoints.RESTlet.delete_<Data, Response<Data>> = (params) => {
  logUser()
  return successResponse({ params })
}
export { delete_ as delete }

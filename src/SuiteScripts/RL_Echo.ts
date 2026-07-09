/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */

import type { EntryPoints } from 'N/types'
import log from 'N/log'
import runtime from 'N/runtime'
import { successResponse, Response } from './utils/response'

type Data = Record<string, unknown>

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
  return successResponse({ body })
}

export const put: EntryPoints.RESTlet.put<Data, Response<Data>> = (body) => {
  logUser()
  return successResponse({ body })
}

const delete_: EntryPoints.RESTlet.delete_<Data, Response<Data>> = (params) => {
  logUser()
  return successResponse({ params })
}
export { delete_ as delete }

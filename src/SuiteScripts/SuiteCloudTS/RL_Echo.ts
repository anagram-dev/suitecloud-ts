/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */

import type { EntryPoints } from 'N/types'
import { successResponse, Response } from './utils/response'

type Data = Record<string, unknown>

export const get: EntryPoints.RESTlet.get<Data, Response<Data>> = (params) =>
  successResponse({ params })

export const post: EntryPoints.RESTlet.post<Data, Response<Data>> = (body) =>
  successResponse({ body })

export const put: EntryPoints.RESTlet.put<Data, Response<Data>> = (body) =>
  successResponse({ body })

const delete_: EntryPoints.RESTlet.delete_<Data, Response<Data>> = (params) =>
  successResponse({
    params,
  })
export { delete_ as delete }

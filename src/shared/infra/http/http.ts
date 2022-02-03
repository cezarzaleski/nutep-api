import { ServerError } from 'src/shared/exception/server-error'
import EmptyParamError from 'src/shared/exception/empty-param'
import InvalidEmailError from 'src/shared/exception/invalid-email'
import NotFoundError from 'src/shared/exception/not-found'
import InvalidParamError from 'src/shared/exception/invalid-param'
import UnauthorizedError from 'src/authenticate/domain/exception/unauthorized'

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export const badRequest = (error: Error | any): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message
  }
})

export const httpResponseError = (error: Error| unknown): HttpResponse => {
  const exceptionsBadRequest = [
    EmptyParamError,
    InvalidEmailError,
    InvalidParamError
  ]

  if (exceptionsBadRequest.some(exception => error instanceof exception)) return badRequest(error)
  if (error instanceof UnauthorizedError) return unauthorized(error)
  if (error instanceof NotFoundError) return notFound(error)
  return serverError(error)
}

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: {
    message: error.message
  }
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error| any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const notFound = (error: any): HttpResponse => ({
  statusCode: 404,
  body: error
})

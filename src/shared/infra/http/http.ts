import { ServerError } from 'src/shared/exception/server-error';


export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message
  }
})

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

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
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

export const notFound = (error): HttpResponse => ({
  statusCode: 404,
  body: error
})

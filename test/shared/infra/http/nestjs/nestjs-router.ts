
import { HttpException, HttpStatus } from '@nestjs/common'
// @ts-expect-error
import { Response } from 'express'
import { HttpResponse } from 'src/shared/infra/http/http'

export const adaptNestJSResolver = async (httpResponse: HttpResponse, response: Response): Promise<any> => {
  if ([HttpStatus.OK, HttpStatus.NO_CONTENT, HttpStatus.CREATED].includes(httpResponse.statusCode)) {
    return response
      .status(httpResponse.statusCode)
      .send(httpResponse.body)
  }
  throw new HttpException(httpResponse.body.message, httpResponse.statusCode)
}

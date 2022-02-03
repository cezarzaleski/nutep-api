import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// @ts-expect-error
import { Response } from 'express'
import AuthController from 'src/authenticate/infra/controller/auth-controller'
import { LoginInput } from 'src/shared/infra/http/nestjs/authenticate/input/login-input'
import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database'
import { JwtAdapter } from 'src/authenticate/infra/cryptography/jwt-adapter'
import { adaptNestJSResolver } from 'src/shared/infra/http/nestjs/nestjs-router'

@Controller('auth')
@ApiTags('Authenticate')
export class AuthenticateRouter {
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Login' })
  async login (@Body() input: LoginInput, @Res() response: Response): Promise<any> {
    const authController = new AuthController(new UserRepositoryDatabase(), new JwtAdapter('123'))
    const authenticateResponse = await authController.authenticate(input.username, input.password)
    return adaptNestJSResolver(authenticateResponse, response)
  }
}

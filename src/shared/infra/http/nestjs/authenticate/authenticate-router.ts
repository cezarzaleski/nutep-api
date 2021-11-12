import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import AuthController from '@/authenticate/infra/controller/auth-controller';

@Controller('auth')
@ApiTags('Authenticate')
export class AuthenticateRouter {

  @Post('login')
  @ApiResponse({status: HttpStatus.OK})
  @ApiOperation({summary: 'Login'})
  login(@Body() authenticate: any, @Res() response: Response) {
    const authController = new AuthController()
    return response
      .status(HttpStatus.OK)
      .send( authController.authenticate(authenticate));
  }
}

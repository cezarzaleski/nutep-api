import { Module } from '@nestjs/common'
import { AuthenticateRouter } from 'src/shared/infra/http/nestjs/authenticate/authenticate-router'
import { UserRouter } from 'src/shared/infra/http/nestjs/authenticate/user-router'

@Module({
  controllers: [AuthenticateRouter, UserRouter]
})
export class AuthenticateModule {}

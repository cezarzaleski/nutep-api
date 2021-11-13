import { Module } from '@nestjs/common'
import { AuthenticateRouter } from 'src/shared/infra/http/nestjs/authenticate/authenticate-router';

@Module({
  controllers: [AuthenticateRouter],
})
export class AuthenticateModule {}

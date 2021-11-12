import { Module } from '@nestjs/common'
import { AuthenticateRouter } from '@/shared/infra/http/nestjs/authenticate/authenticate-router';

@Module({
  controllers: [AuthenticateRouter],
})
export class AuthenticateModule {}

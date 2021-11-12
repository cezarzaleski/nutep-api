import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AuthenticateModule } from '@/shared/infra/http/nestjs/authenticate/authenticate-module';

@Module({
  imports: [
    AuthenticateModule
  ],
})
class AppModule {}

export const NestApp = NestFactory.create(AppModule)

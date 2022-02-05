import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AuthenticateModule } from 'src/shared/infra/http/nestjs/authenticate/authenticate-module'
import { AdmissionModule } from 'src/shared/infra/http/nestjs/admission/admission-module'

@Module({
  imports: [
    AuthenticateModule,
    AdmissionModule
  ]
})
class AppModule {}

export const NestApp = NestFactory.create(AppModule)

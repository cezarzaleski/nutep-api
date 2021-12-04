import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AuthenticateModule } from 'src/shared/infra/http/nestjs/authenticate/authenticate-module';
import { PatientModule } from 'src/shared/infra/http/nestjs/patient/patient-module';


@Module({
  imports: [
    AuthenticateModule,
    PatientModule
  ],
})
class AppModule {}

export const NestApp = NestFactory.create(AppModule)

import { Module } from '@nestjs/common'
import { PatientRouter } from 'src/shared/infra/http/nestjs/patient/patient-router';

@Module({
  controllers: [PatientRouter],
})
export class PatientModule {}

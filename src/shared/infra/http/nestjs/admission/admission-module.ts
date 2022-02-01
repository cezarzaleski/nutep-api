import { Module } from '@nestjs/common'
import { PatientRouter } from 'src/shared/infra/http/nestjs/admission/patient-router';

@Module({
  controllers: [PatientRouter],
})
export class AdmissionModule {}

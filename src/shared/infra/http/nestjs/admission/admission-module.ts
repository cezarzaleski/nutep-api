import { Module } from '@nestjs/common'
import { PatientRouter } from 'src/shared/infra/http/nestjs/admission/patient-router';
import { AdmissionRouter } from 'src/shared/infra/http/nestjs/admission/admission-router';

@Module({
  controllers: [PatientRouter, AdmissionRouter],
})
export class AdmissionModule {}

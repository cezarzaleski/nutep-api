import { Module } from '@nestjs/common'
import { PatientRouter } from 'src/shared/infra/http/nestjs/admission/patient-router'
import { AdmissionRouter } from 'src/shared/infra/http/nestjs/admission/admission-router'
import { InitialHealthRouter } from 'src/shared/infra/http/nestjs/admission/initial-health-router'

@Module({
  controllers: [PatientRouter, AdmissionRouter, InitialHealthRouter]
})
export class AdmissionModule {}

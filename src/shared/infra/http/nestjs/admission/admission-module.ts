import { Module } from '@nestjs/common'
import { PatientRouter } from 'src/shared/infra/http/nestjs/admission/patient-router'
import { PatientAdmissionRouter } from 'src/shared/infra/http/nestjs/admission/patient-admission-router'
import { InitialHealthRouter } from 'src/shared/infra/http/nestjs/admission/initial-health-router'

@Module({
  controllers: [PatientRouter, PatientAdmissionRouter, InitialHealthRouter]
})
export class AdmissionModule {}

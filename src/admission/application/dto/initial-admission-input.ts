import Patient from 'src/admission/domain/entity/patient'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import mongoose from 'mongoose'

export class InitialAdmissionInput {
  constructor (
    readonly patient: PatientInput
  ) {}
}

export class PatientInput {
  constructor (
    readonly fullName?: string,
    readonly birthday?: string,
    readonly sex?: string,
    readonly cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {}

  static toEntity (patientInput: PatientInput, id?: string): Patient {
    const patientId = !id ? new mongoose.Types.ObjectId().toString() : id
    return new Patient(
      patientId,
      patientInput?.fullName,
      patientInput?.birthday,
      patientInput?.sex,
      HospitalizationStatus.OnAdmission,
      'hospitalId',
      patientInput?.cpf,
      patientInput?.register,
      patientInput?.attendingPhysician,
      patientInput?.healthCare,
      patientInput?.linkPhoto
    )
  }
}

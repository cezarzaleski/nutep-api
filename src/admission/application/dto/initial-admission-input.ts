import Patient from 'src/admission/domain/entity/patient';
import { v4 as uuidv4 } from 'uuid';
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status';
import mongoose from 'mongoose';

export class InitialAdmissionInput {
  constructor(
    readonly patient: PatientInput
  ) {}
}

export class PatientInput {
  constructor(
    readonly fullName: string,
    readonly birthday: string,
    readonly sex: string,
    readonly cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {}
  static toEntity(patientInput: PatientInput) {
    return new Patient(
      new mongoose.Types.ObjectId().toString(),
      patientInput.fullName,
      patientInput.birthday,
      patientInput.sex,
      HospitalizationStatus.OnAdmission,
      uuidv4(),
      patientInput.cpf,
      patientInput.register,
      patientInput.attendingPhysician,
      patientInput.healthCare,
      patientInput.linkPhoto
    )
  }
}

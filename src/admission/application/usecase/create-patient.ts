import PatientRepository from 'src/admission/domain/repository/patient-repository'
import CreatePatientInput from 'src/admission/application/dto/create-patient-input'
import Patient from 'src/admission/domain/entity/patient'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import mongoose from 'mongoose'

export default class CreatePatient {
  private readonly patientRepository: PatientRepository

  constructor (patientRepository: PatientRepository) {
    this.patientRepository = patientRepository
  }

  async execute (input: CreatePatientInput): Promise<Patient> {
    const patient = new Patient(
      new mongoose.Types.ObjectId().toString(),
      input.fullName,
      input.birthday,
      input.sex,
      HospitalizationStatus.OnAdmission,
      'hospitalId',
      input.cpf,
      input.register,
      input.attendingPhysician,
      input.healthCare,
      input.linkPhoto
    )
    return await this.patientRepository.save(patient)
  }
}

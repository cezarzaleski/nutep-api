import PatientRepository from 'src/admission/domain/repository/patient-repository'
import CreatePatientInput from 'src/admission/application/dto/create-patient-input'
import Patient from 'src/admission/domain/entity/patient'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'

export default class UpdatePatient {
  private readonly patientRepository: PatientRepository

  constructor (patientRepository: PatientRepository) {
    this.patientRepository = patientRepository
  }

  async execute (patientId: string, input: CreatePatientInput): Promise<Patient> {
    await this.patientRepository.findById(patientId)
    const patient = new Patient(
      patientId,
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
    return await this.patientRepository.update(patientId, patient)
  }
}

import PatientRepository from 'src/admission/domain/repository/patient-repository'
import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input'
import PatientAdmission from 'src/admission/domain/entity/patient-admission'
import mongoose from 'mongoose'

export default class InitialAdmission {
  private readonly patientRepository: PatientRepository
  private readonly admissionRepository: PatientAdmissionRepository
  constructor (patientRepository: PatientRepository, admissionRepository: PatientAdmissionRepository) {
    this.patientRepository = patientRepository
    this.admissionRepository = admissionRepository
  }

  async execute (input: InitialAdmissionInput, admissionId?: string): Promise<PatientAdmission> {
    if (admissionId) {
      const admissionSaved = await this.admissionRepository.findById(admissionId)
      await this.patientRepository.findById(admissionSaved.patientId)
      await this.patientRepository.update(
        admissionSaved.patientId,
        PatientInput.toEntity(input.patient, admissionSaved.patientId)
      )
      return admissionSaved
    }
    const patientCreated = await this.patientRepository.save(PatientInput.toEntity(input.patient))
    const admission = new PatientAdmission(new mongoose.Types.ObjectId().toString(), patientCreated.id, 'initial')
    return await this.admissionRepository.save(admission)
  }
}

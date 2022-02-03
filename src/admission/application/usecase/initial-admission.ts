import PatientRepository from 'src/admission/domain/repository/patient-repository'
import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input'
import Admission from 'src/admission/domain/entity/admission'
import mongoose from 'mongoose'

export default class InitialAdmission {
  private readonly patientRepository: PatientRepository
  private readonly admissionRepository: AdmissionRepository
  constructor (patientRepository: PatientRepository, admissionRepository: AdmissionRepository) {
    this.patientRepository = patientRepository
    this.admissionRepository = admissionRepository
  }

  async execute (input: InitialAdmissionInput, admissionId?: string): Promise<Admission> {
    if (admissionId) {
      const admissionSaved = await this.admissionRepository.findById(admissionId)
      await this.patientRepository.findById(admissionSaved.patientId)
      await this.patientRepository.update(admissionSaved.patientId, PatientInput.toEntity(input.patient))
      return admissionSaved
    }
    const patientCreated = await this.patientRepository.save(PatientInput.toEntity(input.patient))
    const admission = new Admission(new mongoose.Types.ObjectId().toString(), patientCreated.id, 'initial')
    return await this.admissionRepository.save(admission)
  }
}

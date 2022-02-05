import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import { FinalizeAdmissionInput } from 'src/admission/application/dto/finalize-admission-input'
import Admission from 'src/admission/domain/entity/admission'

export default class FinalizeAdmission {
  private readonly admissionRepository: AdmissionRepository
  private readonly patientAdmissionRepository: PatientAdmissionRepository
  constructor (admissionRepository: AdmissionRepository, patientAdmissionRepository: PatientAdmissionRepository) {
    this.admissionRepository = admissionRepository
    this.patientAdmissionRepository = patientAdmissionRepository
  }

  async execute (input: FinalizeAdmissionInput, patientAdmissionId: string): Promise<Admission> {
    const patientAdmissionSaved = await this.patientAdmissionRepository.findById(patientAdmissionId)
    if (patientAdmissionSaved.getAdmissionId()) {
      return await this.admissionRepository.update(
        // @ts-expect-error
        patientAdmissionSaved.getAdmissionId(),
        FinalizeAdmissionInput.toEntity(input, patientAdmissionSaved.getAdmissionId())
      )
    }
    const admissionCreated = await this.admissionRepository.save(FinalizeAdmissionInput.toEntity(input))
    patientAdmissionSaved.setAdmissionId(admissionCreated.id)
    await this.patientAdmissionRepository.update(patientAdmissionId, patientAdmissionSaved)
    return admissionCreated
  }
}

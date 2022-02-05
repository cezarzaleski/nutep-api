import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import InitialHealth from 'src/admission/domain/entity/initial-health'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'

export default class CreateInitialHealth {
  private readonly initialHealthRepository: InitialHealthRepository
  private readonly admissionRepository: PatientAdmissionRepository

  constructor (initialHealthRepository: InitialHealthRepository, admissionRepository: PatientAdmissionRepository) {
    this.initialHealthRepository = initialHealthRepository
    this.admissionRepository = admissionRepository
  }

  async execute (input: InitialHealthInput, admissionId: string): Promise<InitialHealth> {
    const admissionSaved = await this.admissionRepository.findById(admissionId)
    if (admissionSaved.getInitialHealthId()) {
      // @ts-expect-error
      return await this.initialHealthRepository.update(admissionSaved.getInitialHealthId(), InitialHealthInput.toEntity(input, admissionSaved.getInitialHealthId()))
    }
    const initialHealthCreated = await this.initialHealthRepository.save(InitialHealthInput.toEntity(input))
    admissionSaved.setInitialHealth(initialHealthCreated.id)
    await this.admissionRepository.update(admissionId, admissionSaved)
    return initialHealthCreated
  }
}

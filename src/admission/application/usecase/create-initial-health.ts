import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import InitialHealth from 'src/admission/domain/entity/initial-health'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'

export default class CreateInitialHealth {
  private readonly initialHealthRepository: InitialHealthRepository
  private readonly admissionRepository: AdmissionRepository

  constructor (initialHealthRepository: InitialHealthRepository, admissionRepository: AdmissionRepository) {
    this.initialHealthRepository = initialHealthRepository
    this.admissionRepository = admissionRepository
  }

  async execute (input: InitialHealthInput, admissionId: string): Promise<InitialHealth> {
    const admissionSaved = await this.admissionRepository.findById(admissionId)
    const initialHealthCreated = await this.initialHealthRepository.save(InitialHealthInput.toEntity(input))
    admissionSaved.setInitialHealth(initialHealthCreated.id)
    await this.admissionRepository.update(admissionId, admissionSaved)
    return initialHealthCreated
  }
}

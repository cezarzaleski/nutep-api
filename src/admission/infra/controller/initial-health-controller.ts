import { created, httpResponseError, ok } from 'src/shared/infra/http/http'
import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import CreateInitialHealth from 'src/admission/application/usecase/create-initial-health'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'

export default class InitialHealthController {
  constructor (
    private readonly admissionRepository: PatientAdmissionRepository,
    private readonly initialHealthRepository: InitialHealthRepository
  ) {
  }

  async save (input: InitialHealthInput, admissionId: string): Promise<any> {
    try {
      const createInitialHeath = new CreateInitialHealth(this.initialHealthRepository, this.admissionRepository)
      const initialHealth = await createInitialHeath.execute(input, admissionId)
      return created(initialHealth)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async update (input: InitialHealthInput, admissionId: string): Promise<any> {
    try {
      const createInitialHeath = new CreateInitialHealth(this.initialHealthRepository, this.admissionRepository)
      const initialHealth = await createInitialHeath.execute(input, admissionId)
      return ok(initialHealth)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}

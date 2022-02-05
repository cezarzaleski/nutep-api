import { created, httpResponseError, ok } from 'src/shared/infra/http/http'
import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input'
import InitialAdmission from 'src/admission/application/usecase/initial-admission'
import PatientRepository from 'src/admission/domain/repository/patient-repository'
import PatientAdmissionDAO from 'src/admission/application/query/patient-admission-DAO'
import GetAdmissions from 'src/admission/application/query/get-admissions'
import GetAdmission from 'src/admission/application/query/get-admission'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'

export default class PatientAdmissionController {
  constructor (
    private readonly admissionRepository: PatientAdmissionRepository,
    private readonly patientRepository: PatientRepository,
    private readonly admissionDAO: PatientAdmissionDAO,
    private readonly initialHealthRepository: InitialHealthRepository
  ) {
  }

  async initial (input: InitialAdmissionInput): Promise<any> {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.admissionRepository)
      const admission = await initialAdmission.execute(input)
      return created(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findAll (): Promise<any> {
    try {
      const getAdmissions = new GetAdmissions(this.admissionDAO)
      const patients = await getAdmissions.execute()
      return ok(patients)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findById (id: string): Promise<any> {
    try {
      const getAdmission = new GetAdmission(this.admissionRepository, this.patientRepository, this.initialHealthRepository)
      const patient = await getAdmission.execute(id)
      return ok(patient)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async update (admissionId: string, input: InitialAdmissionInput): Promise<any> {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.admissionRepository)
      const admission = await initialAdmission.execute(input, admissionId)
      return ok(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}

import { created, httpResponseError, ok } from 'src/shared/infra/http/http'
import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input'
import InitialAdmission from 'src/admission/application/usecase/initial-admission'
import PatientRepository from 'src/admission/domain/repository/patient-repository'
import PatientAdmissionDAO from 'src/admission/application/query/patient-admission-DAO'
import GetPatientAdmissions from 'src/admission/application/query/get-patient-admissions'
import GetPatientAdmission from 'src/admission/application/query/get-patient-admission'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import { FinalizeAdmissionInput } from 'src/admission/application/dto/finalize-admission-input'
import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import FinalizeAdmission from 'src/admission/application/usecase/finalize-admission'

export default class PatientAdmissionController {
  constructor (
    private readonly patientAdmissionRepository: PatientAdmissionRepository,
    private readonly patientRepository: PatientRepository,
    private readonly admissionDAO: PatientAdmissionDAO,
    private readonly initialHealthRepository: InitialHealthRepository,
    private readonly admissionRepository: AdmissionRepository
  ) {
  }

  async initial (input: InitialAdmissionInput): Promise<any> {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.patientAdmissionRepository)
      const admission = await initialAdmission.execute(input)
      return created(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findAll (): Promise<any> {
    try {
      const getAdmissions = new GetPatientAdmissions(this.admissionDAO)
      const patientsAdmissions = await getAdmissions.execute()
      return ok(patientsAdmissions)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findById (id: string): Promise<any> {
    try {
      const getAdmission = new GetPatientAdmission(
        this.patientAdmissionRepository,
        this.patientRepository,
        this.initialHealthRepository,
        this.admissionRepository
      )
      const patientAdmission = await getAdmission.execute(id)
      return ok(patientAdmission)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async update (admissionId: string, input: InitialAdmissionInput): Promise<any> {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.patientAdmissionRepository)
      const admission = await initialAdmission.execute(input, admissionId)
      return ok(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async finalize (input: FinalizeAdmissionInput, admissionId: string): Promise<any> {
    try {
      const finalizeAdmission = new FinalizeAdmission(this.admissionRepository, this.patientAdmissionRepository)
      const admission = await finalizeAdmission.execute(input, admissionId)
      return created(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}

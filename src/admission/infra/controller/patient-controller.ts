import { created, httpResponseError, ok } from 'src/shared/infra/http/http'
import PatientRepository from 'src/admission/domain/repository/patient-repository'
import CreatePatient from 'src/admission/application/usecase/create-patient'
import CreatePatientInput from 'src/admission/application/dto/create-patient-input'
import GetPatients from 'src/admission/application/query/get-patients'
import PatientDAO from 'src/admission/application/query/patient-DAO'
import GetPatient from 'src/admission/application/query/get-patient'
import UpdatePatient from 'src/admission/application/usecase/update-patient'

export default class PatientController {
  constructor (
    private readonly patientRepository: PatientRepository,
    private readonly patientDAO: PatientDAO
  ) {}

  async create (input: CreatePatientInput): Promise<any> {
    try {
      const createPatient = new CreatePatient(this.patientRepository)
      const patient = await createPatient.execute(input)
      return created(patient)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async update (patientId: string, input: CreatePatientInput): Promise<any> {
    try {
      const updatePatient = new UpdatePatient(this.patientRepository)
      const patient = await updatePatient.execute(patientId, input)
      return ok(patient)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async getPatients (): Promise<any> {
    try {
      const getPatients = new GetPatients(this.patientDAO)
      const patients = await getPatients.execute()
      return ok(patients)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findById (id: string): Promise<any> {
    try {
      const getPatient = new GetPatient(this.patientRepository)
      const patient = await getPatient.execute(id)
      return ok(patient)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}

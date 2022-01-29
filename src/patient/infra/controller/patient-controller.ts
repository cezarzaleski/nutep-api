import { created, httpResponseError, ok } from 'src/shared/infra/http/http';
import PatientRepository from 'src/patient/domain/repository/patient-repository';
import CreatePatient from 'src/patient/application/usecase/create-patient';
import CreatePatientInput from 'src/patient/application/dto/create-patient-input';
import GetPatients from 'src/patient/application/query/get-patients';
import PatientDAO from 'src/patient/application/query/patient-DAO';

export default class PatientController {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientDAO: PatientDAO
  ) {}

  async create(input: CreatePatientInput) {
    try {
      const createPatient = new CreatePatient(this.patientRepository)
      const patient = await createPatient.execute(input)
      return created(patient)
    }  catch (error) {
      return httpResponseError(error)
    }
  }

  async getPatients() {
    try {
      const getPatients = new GetPatients(this.patientDAO)
      const patients = await getPatients.execute()
      return ok(patients)
    }  catch (error) {
      return httpResponseError(error)
    }
  }
}

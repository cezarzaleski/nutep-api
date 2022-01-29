import { created, httpResponseError } from 'src/shared/infra/http/http';
import PatientRepository from 'src/patient/domain/repository/patient-repository';
import CreatePatient from 'src/patient/application/usecase/create-patient';
import CreatePatientInput from 'src/patient/application/dto/create-patient-input';

export default class PatientController {
  constructor(
    private readonly patientRepository: PatientRepository
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
}

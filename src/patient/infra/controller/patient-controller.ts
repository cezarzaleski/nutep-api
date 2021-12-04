import { badRequest, ok, serverError, unauthorized } from 'src/shared/infra/http/http';
import InvalidEmailError from 'src/shared/exception/invalid-email';
import EmptyParamError from 'src/shared/exception/empty-param';
import NotFoundError from 'src/shared/exception/not-found';
import UnauthorizedError from 'src/authenticate/domain/exception/unauthorized';
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
      await createPatient.execute(input)
      return ok({})
    }  catch (error) {
      if (error instanceof EmptyParamError || error instanceof InvalidEmailError || error instanceof NotFoundError) return badRequest(error)
      if (error instanceof UnauthorizedError) return unauthorized(error)
      return serverError(error)
    }
  }
}

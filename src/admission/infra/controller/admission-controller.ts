import { created, httpResponseError } from 'src/shared/infra/http/http';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input';
import InitialAdmission from 'src/admission/application/usecase/initial-admission';
import PatientRepository from 'src/admission/domain/repository/patient-repository';

export default class AdmissionController {
  constructor(
    private readonly admissionRepository: AdmissionRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async initial(input: InitialAdmissionInput) {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.admissionRepository)
      const admission = await initialAdmission.execute(input)
      return created(admission)
    }  catch (error) {
      return httpResponseError(error)
    }
  }
}

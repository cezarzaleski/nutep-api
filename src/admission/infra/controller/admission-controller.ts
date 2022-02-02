import { created, httpResponseError, ok } from 'src/shared/infra/http/http';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';
import { InitialAdmissionInput } from 'src/admission/application/dto/initial-admission-input';
import InitialAdmission from 'src/admission/application/usecase/initial-admission';
import PatientRepository from 'src/admission/domain/repository/patient-repository';
import AdmissionDAO from 'src/admission/application/query/admission-DAO';
import GetAdmissions from 'src/admission/application/query/get-admissions';

export default class AdmissionController {
  constructor(
    private readonly admissionRepository: AdmissionRepository,
    private readonly patientRepository: PatientRepository,
    private readonly admissionDAO: AdmissionDAO
  ) {
  }

  async initial(input: InitialAdmissionInput) {
    try {
      const initialAdmission = new InitialAdmission(this.patientRepository, this.admissionRepository)
      const admission = await initialAdmission.execute(input)
      return created(admission)
    } catch (error) {
      return httpResponseError(error)
    }
  }

  async findAll() {
    try {
      const getAdmissions = new GetAdmissions(this.admissionDAO)
      const patients = await getAdmissions.execute()
      return ok(patients)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}

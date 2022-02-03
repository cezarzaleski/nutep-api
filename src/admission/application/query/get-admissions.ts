import PatientDTO from 'src/admission/application/query/patient-DTO'
import AdmissionDAO from 'src/admission/application/query/admission-DAO'

export default class GetAdmissions {
  constructor (readonly admissionDAO: AdmissionDAO) {}

  async execute (): Promise<PatientDTO[]> {
    return await this.admissionDAO.getPatients()
  }
}

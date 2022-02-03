import PatientDTO from 'src/admission/application/query/patient-DTO'

export default interface AdmissionDAO {
  getPatients: () => Promise<PatientDTO[]>
}

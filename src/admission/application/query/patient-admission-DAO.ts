import PatientDTO from 'src/admission/application/query/patient-DTO'

export default interface PatientAdmissionDAO {
  getPatients: () => Promise<PatientDTO[]>
}

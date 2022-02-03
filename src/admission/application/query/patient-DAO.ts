import PatientDTO from 'src/admission/application/query/patient-DTO'

export default interface PatientDAO {
  getPatients: () => Promise<PatientDTO[]>
}

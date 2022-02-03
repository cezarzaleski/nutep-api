import Patient from 'src/admission/domain/entity/patient'

export default interface PatientRepository {
  save: (patient: Patient) => Promise<Patient>
  findById: (id: string) => Promise<Patient>
  update: (patientId: string, patient: Patient) => Promise<Patient>
}

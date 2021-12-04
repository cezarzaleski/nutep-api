import Patient from 'src/patient/domain/entity/patient';

export default interface PatientRepository {
  save(patient: Patient): Promise<Patient>
}

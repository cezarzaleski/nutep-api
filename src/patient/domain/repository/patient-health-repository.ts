import PatientHealth from 'src/patient/domain/entity/patient-health';

export default interface PatientHealthRepository {
  save(patientHealth: PatientHealth): Promise<PatientHealth>
}

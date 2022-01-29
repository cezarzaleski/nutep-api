import PatientDTO from 'src/patient/application/query/patient-DTO';

export default interface PatientDAO {
	getPatients(): Promise<PatientDTO[]>;
}

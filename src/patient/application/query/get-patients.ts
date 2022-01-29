import PatientDAO from 'src/patient/application/query/patient-DAO';
import PatientDTO from 'src/patient/application/query/patient-DTO';

export default class GetPatients {

	constructor (readonly patientDAO: PatientDAO) {
	}

	async execute (): Promise<PatientDTO[]> {
		return await this.patientDAO.getPatients();
	}
}

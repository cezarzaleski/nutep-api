import PatientDAO from 'src/patient/application/query/patient-DAO';
import PatientDTO from 'src/patient/application/query/patient-DTO';
import mongoose from 'mongoose';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';

export default class PatientDAODatabase implements PatientDAO {
  private readonly patientModel: mongoose.Model<mongoose.Document>
	constructor () {
    this.patientModel = MongoPatientModel
	}

  async getPatients(): Promise<PatientDTO[]> {
    // @ts-ignore
    const patients: MongoPatientSchema[] =  await this.patientModel.find({})
    return patients.map(patient => new PatientDTO(patient.uuid, patient.fullName, patient.birthday))
  }
}

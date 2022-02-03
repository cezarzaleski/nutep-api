import PatientDAO from 'src/admission/application/query/patient-DAO'
import PatientDTO from 'src/admission/application/query/patient-DTO'
import mongoose from 'mongoose'
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'

export default class PatientDAODatabase implements PatientDAO {
  private readonly patientModel: mongoose.Model<mongoose.Document>
  constructor () {
    this.patientModel = MongoPatientModel
  }

  async getPatients (): Promise<PatientDTO[]> {
    const patients: MongoPatientSchema[] = await this.patientModel.find({})
    return patients.map(patient => new PatientDTO(patient._id, patient.fullName, patient.birthday))
  }
}

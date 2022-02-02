import PatientDTO from 'src/admission/application/query/patient-DTO';
import mongoose from 'mongoose';
import AdmissionDAO from 'src/admission/application/query/admission-DAO';
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema';

export default class AdmissionDAODatabase implements AdmissionDAO {
  private readonly admissionModel: mongoose.Model<mongoose.Document>
	constructor () {
    this.admissionModel = MongoAdmissionModel
	}

  async getPatients(): Promise<PatientDTO[]> {
    // @ts-ignore
    const admissions: MongoAdmissionSchema[] =  await this.admissionModel
      .find({})
      .populate('patient')
    return admissions.map(admission => new PatientDTO(admission._id, admission.patient.fullName, admission.patient.birthday))
  }
}

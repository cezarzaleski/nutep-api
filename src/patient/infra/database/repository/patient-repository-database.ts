import mongoose from 'mongoose';
import PatientRepository from 'src/patient/domain/repository/patient-repository';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';
import Patient from 'src/patient/domain/entity/patient';

export default class PatientRepositoryDatabase implements PatientRepository {
  private readonly patientModel: mongoose.Model<mongoose.Document>
  constructor(
  ) {
    this.patientModel = MongoPatientModel
  }

  async save(patient: Patient): Promise<Patient> {
    const mongoPatient = <MongoPatientSchema>{
      fullName: patient.fullName,
      birthday: patient.birthday,
      sex: patient.sex,
      hospitalizationStatus: patient.hospitalizationStatus,
      cpf: patient.getCpf().value,
      register: patient.register,
      attendingPhysician: patient.attendingPhysician,
      healthCare: patient.healthCare,
      linkPhoto: patient.linkPhoto
    };
    await this.patientModel.create(mongoPatient);
    return Promise.resolve(patient);
  }

}

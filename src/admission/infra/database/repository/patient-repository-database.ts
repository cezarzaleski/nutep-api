import mongoose from 'mongoose';
import PatientRepository from 'src/admission/domain/repository/patient-repository';
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema';
import Patient from 'src/admission/domain/entity/patient';
import NotFoundError from 'src/shared/exception/not-found';

export default class PatientRepositoryDatabase implements PatientRepository {
  private readonly patientModel: mongoose.Model<mongoose.Document>
  constructor(
  ) {
    this.patientModel = MongoPatientModel
  }

  async save(patient: Patient): Promise<Patient> {
    const mongoPatient = <MongoPatientSchema>{
      _id: patient.id,
      uuid: patient.id,
      fullName: patient.fullName,
      birthday: patient.birthday,
      sex: patient.getSex(),
      hospitalizationStatus: patient.getHospitalizationStatus(),
      cpf: patient.getCpf()?.value,
      register: patient.register,
      attendingPhysician: patient.attendingPhysician,
      healthCare: patient.healthCare,
      linkPhoto: patient.linkPhoto
    };
    await this.patientModel.create(mongoPatient);
    return Promise.resolve(patient);
  }

  async findById(id: string): Promise<Patient> {
    // @ts-ignore
    const patient: MongoPatientSchema = await this.patientModel.findOne({_id: id});
    if (patient) return MongoPatientSchema.toEntity(patient)
    throw new NotFoundError('Patient')
  }

  async update(patientId: string, patient: Patient): Promise<Patient> {
    await this.patientModel
      .findOneAndUpdate({_id: patientId}, MongoPatientSchema.toSchema(patient));
    return patient
  }
}

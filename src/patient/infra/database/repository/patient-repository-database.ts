import mongoose from 'mongoose';
import PatientRepository from 'src/patient/domain/repository/patient-repository';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';
import Patient from 'src/patient/domain/entity/patient';
import PatientHealth from 'src/patient/domain/entity/patient-health';
import {
  MongoPatientHealthModel,
  MongoPatientHealthSchema
} from 'src/patient/infra/database/schemas/mongo-patient-health.schema';
import NotFoundError from 'src/shared/exception/not-found';

export default class PatientRepositoryDatabase implements PatientRepository {
  private readonly patientModel: mongoose.Model<mongoose.Document>
  private readonly patientHealthModel: mongoose.Model<mongoose.Document>
  constructor(
  ) {
    this.patientModel = MongoPatientModel
    this.patientHealthModel = MongoPatientHealthModel
  }

  async save(patient: Patient): Promise<Patient> {
    const mongoPatient = <MongoPatientSchema>{
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
    if (patient.getHealth()) {
      // @ts-ignore
      mongoPatient.health = await this.saveHealth(patient.getHealth())
    }
    await this.patientModel.create(mongoPatient);
    return Promise.resolve(patient);
  }

  async saveHealth(patientHealth: PatientHealth): Promise<any> {
    const mongoPatientHealth = <MongoPatientHealthSchema>{
      uuid: patientHealth.id,
      initialDescription: patientHealth.initialDescription,
      dialysis: patientHealth.getDialysis(),
      insulin: patientHealth.getInsulin(),
      oralDiet: patientHealth.getOralDiet(),
      diagnostics: patientHealth.getInitialDiagnosis(),
      comorbidities: patientHealth.getComorbidities(),
      allergies: patientHealth.getAllergies(),
      mechanicalVentilation: patientHealth.getMechanicalVentilation(),
      consciousnessLevels: patientHealth.getConsciousnessLevels(),
      pressureInjury: patientHealth.pressureInjury
    };
    return await this.patientHealthModel.create(mongoPatientHealth);
  }

  async findById(id: string): Promise<Patient> {
    // @ts-ignore
    const patient: MongoPatientSchema = await this.patientModel.findOne({uuid: id});
    if (patient) return MongoPatientSchema.toEntity(patient)
    throw new NotFoundError('Patient')
  }

  async update(patientId: string, patient: Patient): Promise<Patient> {
    await this.patientModel
      .findOneAndUpdate({uuid: patientId}, MongoPatientSchema.toSchema(patient));
    return patient
  }
}

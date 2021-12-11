import mongoose from 'mongoose';
import PatientHealthRepository from 'src/patient/domain/repository/patient-health-repository';
import PatientHealth from 'src/patient/domain/entity/patient-health';
import {
  MongoPatientHealthModel,
  MongoPatientHealthSchema
} from 'src/patient/infra/database/schemas/mongo-patient-health.schema';

export default class PatientHealthRepositoryDatabase implements PatientHealthRepository {
  private readonly patientHealthModel: mongoose.Model<mongoose.Document>
  constructor(
  ) {
    this.patientHealthModel = MongoPatientHealthModel
  }

  async save(patientHealth: PatientHealth): Promise<PatientHealth> {
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
    await this.patientHealthModel.create(mongoPatientHealth);
    return Promise.resolve(patientHealth);
  }

}

import { makeTestDb } from 'test/shared/infra/database/connection';
import mongoose from "mongoose";
import PatientRepositoryDatabase from 'src/patient/infra/database/repository/patient-repository-database';
import { v4 as uuidv4 } from 'uuid';
import PatientHealth from 'src/patient/domain/entity/patient-health';
import PatientHealthRepositoryDatabase from 'src/patient/infra/database/repository/patient-health-repository-database';
import {
  MongoPatientHealthModel,
  MongoPatientHealthSchema
} from 'src/patient/infra/database/schemas/mongo-patient-health.schema';


beforeAll(async () => {
  await makeTestDb()
})
afterAll(async () => {
  await mongoose.connection.close();
});


describe('PatientRepositoryDatabase', () => {
  let sut: PatientHealthRepositoryDatabase
  let patientHealth: PatientHealth
  beforeAll(async () => {
    sut = new PatientHealthRepositoryDatabase()
    patientHealth = new PatientHealth(
      uuidv4(),
      uuidv4(),
      'initialDescription',
      'typeVentilation',
      'methodVentilation',
      'Y',
      'Y',
      'Y',
    )
  })

  afterAll(async () => {
    await MongoPatientHealthModel.deleteMany({})
  })

  it('Should create patient',async () => {
    await sut.save(patientHealth)
    // @ts-ignore
    const patientHealthSaved: MongoPatientHealthSchema = await MongoPatientHealthModel.findOne({})
    expect(patientHealthSaved.initialDescription).toEqual(patientHealth.initialDescription)
    expect(patientHealthSaved.uuid).toEqual(patientHealth.id)
    expect(patientHealthSaved.dialysis).toEqual(patientHealth.getDialysis())
    expect(patientHealthSaved.insulin).toEqual(patientHealth.getInsulin())
    expect(patientHealthSaved.oralDiet).toEqual(patientHealth.getOralDiet())
    expect(patientHealthSaved.diagnostics).toEqual(patientHealth.getInitialDiagnosis())
    expect(patientHealthSaved.comorbidities).toEqual(patientHealth.getComorbidities())
    expect(patientHealthSaved.allergies).toEqual(patientHealth.getAllergies())
    expect(patientHealthSaved.mechanicalVentilation).toEqual(patientHealth.getMechanicalVentilation())
    expect(patientHealthSaved.consciousnessLevels).toEqual(patientHealth.getConsciousnessLevels())
    expect(patientHealthSaved.pressureInjury).toEqual(patientHealth.pressureInjury)
  })
})

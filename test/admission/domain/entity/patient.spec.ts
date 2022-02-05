import Patient from 'src/admission/domain/entity/patient'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import EmptyParamError from 'src/shared/exception/empty-param'
import InvalidParamError from 'src/shared/exception/invalid-param'
import mongoose from 'mongoose'

test('Should create a new patient', async () => {
  const patient = new Patient(new mongoose.Types.ObjectId().toString(), 'Cezar Zaleski', '2000-11-23', Sex.Masculine, HospitalizationStatus.OnAdmission, 'hospitalId')
  expect(patient).toBeDefined()
})

test('Should create a new patient with cpf', async () => {
  const patient = new Patient(new mongoose.Types.ObjectId().toString(), 'Cezar Zaleski', '2000-11-23', Sex.Masculine, HospitalizationStatus.Admitted, '994.499.110-45')
  expect(patient).toBeDefined()
})

test('Should throw exception empty param fullname', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), undefined, '2000-11-23', Sex.Masculine, HospitalizationStatus.Admitted, '994.499.110-45'))
    .toThrow(new EmptyParamError('fullName'))
})
test('Should throw exception empty param birthday', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), 'fullname', undefined, Sex.Masculine, HospitalizationStatus.Admitted, '994.499.110-45'))
    .toThrow(new EmptyParamError('birthday'))
})
test('Should throw exception empty param sex', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), 'fullname', '2000-11-23', undefined, HospitalizationStatus.Admitted, '994.499.110-45'))
    .toThrow(new EmptyParamError('sex'))
})
test('Should throw exception empty param hospitalizationStatus', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), 'fullname', '2000-11-23', Sex.Masculine, undefined, '994.499.110-45'))
    .toThrow(new EmptyParamError('hospitalizationStatus'))
})
test('Should throw exception invalid param sex', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), 'fullname', '2000-11-23', 'ssss', HospitalizationStatus.Admitted, '994.499.110-45'))
    .toThrow(new InvalidParamError('sex'))
})
test('Should throw exception invalid param hospitalizationStatus', async () => {
  expect(() => new Patient(new mongoose.Types.ObjectId().toString(), 'fullname', '2000-11-23', Sex.Female, 'adasdasdsad', '994.499.110-45'))
    .toThrow(new InvalidParamError('hospitalizationStatus'))
})

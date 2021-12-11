import PatientHealth from 'src/patient/domain/entity/patient-health';
import InvalidParamError from 'src/shared/exception/invalid-param';

test("Should create a new patient health", async () => {
  const patient = new PatientHealth(
    'uuid',
    'patientId',
    'initialDescription',
    'typeVentilation',
    'methodVentilation',
    'Y',
    'Y',
    'Y',
  );
  expect(patient).toBeDefined()
});

test("Should throw exception invalid param dialysis", async () => {
  expect(() =>
    new PatientHealth(
      'uuid',
      'patientId',
      'initialDescription',
      'typeVentilation',
      'methodVentilation',
      's',
      'Y',
      'Y',
    ))
    .toThrow(new InvalidParamError('dialysis'))
});
test("Should throw exception invalid param insulin", async () => {
  expect(() =>
    new PatientHealth(
      'uuid',
      'patientId',
      'initialDescription',
      'typeVentilation',
      'methodVentilation',
      'N',
      's',
      'Y',
    ))
    .toThrow(new InvalidParamError('insulin'))
});

test("Should throw exception invalid param oralDiet", async () => {
  expect(() =>
    new PatientHealth(
      'uuid',
      'patientId',
      'initialDescription',
      'typeVentilation',
      'methodVentilation',
      'N',
      'Y',
      'd',
    ))
    .toThrow(new InvalidParamError('oralDiet'))
});

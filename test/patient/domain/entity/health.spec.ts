import Health from 'src/patient/domain/entity/health';
import InvalidParamError from 'src/shared/exception/invalid-param';

test("Should create a new health", async () => {
  const patient = new Health(
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
    new Health(
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
    new Health(
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
    new Health(
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

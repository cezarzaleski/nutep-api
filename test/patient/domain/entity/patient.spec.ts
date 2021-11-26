import Patient from 'src/patient/domain/entity/patient';
import { Sex } from 'src/patient/domain/entity/sex';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';

test("Should create a new patient", async () => {
  const patient = new Patient('Cezar Zaleski', new Date('2000-11-23'), Sex.Masculine, HospitalizationStatus.OnAdmission);
  expect(patient).toBeDefined()
});

test("Should create a new patient with cpf", async () => {
  const patient = new Patient('Cezar Zaleski', new Date('2000-11-23'), Sex.Masculine, HospitalizationStatus.Admitted, '994.499.110-45', );
  expect(patient).toBeDefined()
});

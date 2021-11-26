import Patient from 'src/patient/domain/entity/patient';
import { Sex } from 'src/patient/domain/entity/sex';
import { StatusInternacao } from 'src/patient/domain/entity/status-internacao-';

test("Should create a new patient", async () => {
  const patient = new Patient('Cezar Zaleski', new Date('2000-11-23'), Sex.Masculine, StatusInternacao.EmAdmissao);
  expect(patient).toBeDefined()
});

test("Should create a new patient with cpf", async () => {
  const patient = new Patient('Cezar Zaleski', new Date('2000-11-23'), Sex.Masculine, StatusInternacao.EmAdmissao, '994.499.110-45', );
  expect(patient).toBeDefined()
});

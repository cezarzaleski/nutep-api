import Cpf from 'src/shared/domain/value-object/cpf';
import EmptyParamError from 'src/shared/exception/empty-param';
import { Sex } from 'src/patient/domain/entity/sex';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';
import InvalidParamError from 'src/shared/exception/invalid-param';
import PatientHealth from 'src/patient/domain/entity/patient-health';

export default class Patient {
  private readonly cpf: Cpf
  private readonly sex: Sex
  private readonly hospitalizationStatus: HospitalizationStatus
  private health: PatientHealth
  readonly birthday: Date

  constructor(
    readonly id: string,
    readonly fullName: string,
    birthday: string,
    sex: string,
    hospitalizationStatus: string,
    hospitalId: string,
    cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {
    if (!fullName) throw new EmptyParamError('fullName')
    if (!birthday) throw new EmptyParamError('birthday')
    if (!sex) throw new EmptyParamError('sex')
    if (!hospitalizationStatus) throw new EmptyParamError('hospitalizationStatus')
    if (!id) throw new EmptyParamError('id')
    if (cpf) this.cpf = Cpf.create(cpf)
    if (!Object.values(Sex).includes(sex as Sex)) throw new InvalidParamError('sex')
    if (!Object.values(HospitalizationStatus).includes(hospitalizationStatus as HospitalizationStatus)) throw new InvalidParamError('hospitalizationStatus')
    this.birthday = new Date(birthday);
    if (this.birthday.toString() === 'Invalid Date') throw new InvalidParamError('birthday')
    this.sex = sex as Sex;
    this.hospitalizationStatus = hospitalizationStatus as HospitalizationStatus;
  }
  setHealth(health: PatientHealth) { this.health = health}
  getCpf() { return this.cpf}
  getSex() { return this.sex}
  getHospitalizationStatus() { return this.hospitalizationStatus}
  getHealth() { return this.health}
}

import Cpf from 'src/shared/domain/value-object/cpf';
import EmptyParamError from 'src/shared/exception/empty-param';
import { Sex } from 'src/patient/domain/entity/sex';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';
import InvalidParamError from 'src/shared/exception/invalid-param';

export default class Patient {
  private readonly cpf: Cpf
  private readonly sex: Sex
  private readonly hospitalizationStatus: HospitalizationStatus

  constructor(
    readonly id: string,
    readonly fullName: string,
    readonly birthday: Date,
    sex: string,
    hospitalizationStatus: string,
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
    this.sex = sex as Sex;
    this.hospitalizationStatus = hospitalizationStatus as HospitalizationStatus;
  }
  getCpf() { return this.cpf}
  getSex() { return this.sex}
  getHospitalizationStatus() { return this.hospitalizationStatus}
}

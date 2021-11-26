import Cpf from 'src/shared/domain/value-object/cpf';
import EmptyParamError from 'src/shared/exception/empty-param';
import { Sex } from 'src/patient/domain/entity/sex';
import { StatusInternacao } from 'src/patient/domain/entity/status-internacao-';

export default class Patient {
  private cpf: Cpf

  constructor(
    readonly fullName: string,
    readonly birthday: Date,
    readonly sex: Sex,
    readonly statusInternacao: StatusInternacao,
    cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {
    if (!fullName) throw new EmptyParamError('fullName')
    if (!birthday) throw new EmptyParamError('birthday')
    if (!sex) throw new EmptyParamError('sex')
    if (!statusInternacao) throw new EmptyParamError('statusInternacao')
    if (cpf) this.cpf = Cpf.create(cpf)
  }
}

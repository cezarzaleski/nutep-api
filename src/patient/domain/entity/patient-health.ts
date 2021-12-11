import EmptyParamError from 'src/shared/exception/empty-param';
import MechanicalVentilation from 'src/patient/domain/entity/mechanical-ventilation';
import { ConsciousnessLevel } from 'src/patient/domain/entity/consciousness-level';
import { YesOrNo } from 'src/shared/domain/enum/yes-or-no';
import InvalidParamError from 'src/shared/exception/invalid-param';
import Diagnostic from 'src/patient/domain/entity/diagnostic';

export default class PatientHealth {
  private readonly mechanicalVentilation: MechanicalVentilation
  private readonly consciousnessLevels: Array<ConsciousnessLevel>
  private readonly dialysis: YesOrNo
  private readonly insulin: YesOrNo
  private readonly oralDiet: YesOrNo
  private readonly diagnostics: Array<Diagnostic>
  private readonly comorbidities: Array<string>
  private readonly allergies: Array<string>

  constructor(
    readonly id: string,
    readonly patientId: string,
    readonly initialDescription: string,
    typeVentilation: string,
    methodVentilation: string,
    dialysis: string,
    insulin: string,
    oralDiet: string,
    readonly pressureInjury?: string
  ) {
    if (!patientId) throw new EmptyParamError('patientId')
    if (!initialDescription) throw new EmptyParamError('initialDescription')
    if (typeVentilation && methodVentilation) this.mechanicalVentilation = new MechanicalVentilation(typeVentilation, methodVentilation)
    PatientHealth.validateYesOrNo(dialysis, 'dialysis')
    PatientHealth.validateYesOrNo(insulin, 'insulin')
    PatientHealth.validateYesOrNo(oralDiet, 'oralDiet')
    this.consciousnessLevels = []
    this.comorbidities = []
    this.allergies = []
    this.diagnostics = []
    this.dialysis = dialysis as YesOrNo;
    this.insulin = insulin as YesOrNo;
    this.oralDiet = oralDiet as YesOrNo;
  }

  addDiagnostic(diagnostic: Diagnostic) {
    this.diagnostics.push(diagnostic)
  }
  addComorbidity(comorbidity: string) {
    this.comorbidities.push(comorbidity)
  }
  addAllergy(allergy: string) {
    this.allergies.push(allergy)
  }
  addConsciousnessLevel(consciousnessLevel: ConsciousnessLevel) {
    this.allergies.push(consciousnessLevel)
  }
  getMechanicalVentilation() { return this.mechanicalVentilation}
  getConsciousnessLevels() { return this.consciousnessLevels}
  getComorbidities() { return this.comorbidities}
  getAllergies() { return this.allergies}
  getInitialDiagnosis() { return this.diagnostics}
  getDialysis() { return this.dialysis}
  getInsulin() { return this.insulin}
  getOralDiet() { return this.oralDiet}

  private static validateYesOrNo(field: string, name: string) {
    if (!Object.values(YesOrNo).includes(field as YesOrNo)) throw new InvalidParamError(name)
  }
}

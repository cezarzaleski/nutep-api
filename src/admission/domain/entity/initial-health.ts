import EmptyParamError from 'src/shared/exception/empty-param'
import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'
import { YesOrNo } from 'src/shared/domain/enum/yes-or-no'
import InvalidParamError from 'src/shared/exception/invalid-param'
import Diagnostic from 'src/admission/domain/entity/diagnostic'

export default class InitialHealth {
  private readonly mechanicalVentilation?: MechanicalVentilation
  private readonly consciousnessLevels: ConsciousnessLevel[]
  private readonly dialysis: YesOrNo
  private readonly insulin: YesOrNo
  private readonly oralDiet: YesOrNo
  private readonly diagnostics: Diagnostic[]
  private readonly comorbidities: string[]
  private readonly allergies: string[]

  constructor (
    readonly id: string,
    readonly initialDescription: string,
    typeVentilation: string,
    methodVentilation: string,
    dialysis: string,
    insulin: string,
    oralDiet: string,
    readonly pressureInjury?: string
  ) {
    if (!initialDescription) throw new EmptyParamError('initialDescription')
    if (typeVentilation && methodVentilation) this.mechanicalVentilation = new MechanicalVentilation(typeVentilation, methodVentilation)
    InitialHealth.validateYesOrNo(dialysis, 'dialysis')
    InitialHealth.validateYesOrNo(insulin, 'insulin')
    InitialHealth.validateYesOrNo(oralDiet, 'oralDiet')
    this.consciousnessLevels = []
    this.comorbidities = []
    this.allergies = []
    this.diagnostics = []
    this.dialysis = dialysis as YesOrNo
    this.insulin = insulin as YesOrNo
    this.oralDiet = oralDiet as YesOrNo
  }

  addDiagnostic (diagnostic: Diagnostic): void {
    this.diagnostics.push(diagnostic)
  }

  addComorbidity (comorbidity: string): void {
    this.comorbidities.push(comorbidity)
  }

  addAllergy (allergy: string): void {
    this.allergies.push(allergy)
  }

  addConsciousnessLevel (consciousnessLevel: ConsciousnessLevel): void {
    this.allergies.push(consciousnessLevel)
  }

  getMechanicalVentilation (): MechanicalVentilation | undefined { return this.mechanicalVentilation }
  getConsciousnessLevels (): ConsciousnessLevel[] { return this.consciousnessLevels }
  getComorbidities (): string[] { return this.comorbidities }
  getAllergies (): string[] { return this.allergies }
  getInitialDiagnosis (): Diagnostic[] { return this.diagnostics }
  getDialysis (): YesOrNo { return this.dialysis }
  getInsulin (): YesOrNo { return this.insulin }
  getOralDiet (): YesOrNo { return this.oralDiet }

  private static validateYesOrNo (field: string, name: string): any {
    if (!Object.values(YesOrNo).includes(field as YesOrNo)) throw new InvalidParamError(name)
  }
}

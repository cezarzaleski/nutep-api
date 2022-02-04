import EmptyParamError from 'src/shared/exception/empty-param'
import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'
import { validateYesOrNo, YesOrNo } from 'src/shared/domain/enum/yes-or-no'
import Diagnostic from 'src/admission/domain/entity/diagnostic'

export default class InitialHealth {
  initialDescription: string
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
    initialDescription?: string,
    mechanicalVentilation?: MechanicalVentilation,
    dialysis?: string,
    insulin?: string,
    oralDiet?: string,
    comorbidities?: string[],
    allergies?: string[],
    consciousnessLevels?: ConsciousnessLevel[]
  ) {
    if (!initialDescription) throw new EmptyParamError('initialDescription')
    if (!dialysis) throw new EmptyParamError('dialysis')
    if (!insulin) throw new EmptyParamError('insulin')
    if (!oralDiet) throw new EmptyParamError('oralDiet')
    this.mechanicalVentilation = mechanicalVentilation
    validateYesOrNo(dialysis, 'dialysis')
    validateYesOrNo(insulin, 'insulin')
    validateYesOrNo(oralDiet, 'oralDiet')
    this.consciousnessLevels = !consciousnessLevels ? [] : consciousnessLevels
    this.comorbidities = !comorbidities ? [] : comorbidities
    this.allergies = !allergies ? [] : allergies
    this.diagnostics = []
    this.dialysis = dialysis as YesOrNo
    this.insulin = insulin as YesOrNo
    this.oralDiet = oralDiet as YesOrNo
    this.initialDescription = initialDescription
  }

  addDiagnostic (diagnostic: Diagnostic): InitialHealth {
    this.diagnostics.push(diagnostic)
    return this
  }

  addDiagnostics (diagnostics?: Diagnostic[]): InitialHealth {
    if (!diagnostics || !diagnostics.length) return this
    diagnostics.forEach(diagnostic => this.addDiagnostic(diagnostic))
    return this
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
  getDiagnostics (): Diagnostic[] { return this.diagnostics }
}

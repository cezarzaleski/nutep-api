import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'
import { YesOrNo } from 'src/shared/domain/enum/yes-or-no'
import Diagnostic from 'src/admission/domain/entity/diagnostic'

export default class InitialHealthOutput {
  constructor (
    readonly id: string,
    readonly initialDescription: string,
    readonly consciousnessLevels: ConsciousnessLevel[],
    readonly dialysis: YesOrNo,
    readonly insulin: YesOrNo,
    readonly oralDiet: YesOrNo,
    readonly diagnostics: Diagnostic[],
    readonly comorbidities: string[],
    readonly allergies: string[],
    readonly mechanicalVentilation?: MechanicalVentilation
  ) {
  }
}

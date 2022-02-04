import mongoose from 'mongoose'
import InitialHealth from 'src/admission/domain/entity/initial-health'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'

export class InitialHealthInput {
  constructor (
    readonly initialDescription?: string,
    readonly mechanicalVentilation?: MechanicalVentilationInput,
    readonly consciousnessLevels?: ConsciousnessLevel[],
    readonly dialysis?: string,
    readonly insulin?: string,
    readonly oralDiet?: string,
    readonly diagnostics?: DiagnosticInput,
    readonly comorbidities?: string[],
    readonly allergies?: string[]
  ) {}

  static toEntity (initialHealthInput: InitialHealthInput, id?: string): InitialHealth {
    return new InitialHealth(
      !id ? new mongoose.Types.ObjectId().toString() : id,
      initialHealthInput.initialDescription,
      initialHealthInput?.mechanicalVentilation,
      initialHealthInput.dialysis,
      initialHealthInput.insulin,
      initialHealthInput.oralDiet,
      initialHealthInput.comorbidities,
      initialHealthInput.allergies,
      initialHealthInput.consciousnessLevels
    )
  }
}

export class MechanicalVentilationInput {
  constructor
  (
    readonly type: string,
    readonly method: string
  ) {}
}

export class DiagnosticInput {
  constructor (readonly cid: string, readonly note: string) {
  }
}

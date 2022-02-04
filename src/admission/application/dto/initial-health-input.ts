import mongoose from 'mongoose'
import InitialHealth from 'src/admission/domain/entity/initial-health'

export class InitialHealthInput {
  constructor (
    readonly initialDescription?: string,
    readonly mechanicalVentilation?: MechanicalVentilationInput,
    readonly consciousnessLevels?: string[],
    readonly dialysis?: string,
    readonly insulin?: string,
    readonly oralDiet?: string,
    readonly diagnostics?: DiagnosticInput,
    readonly comorbidities?: string[],
    readonly allergies?: string[]
  ) {}

  static toEntity (initialHealthInput: InitialHealthInput): InitialHealth {
    return new InitialHealth(
      new mongoose.Types.ObjectId().toString(),
      initialHealthInput.initialDescription,
      initialHealthInput?.mechanicalVentilation,
      initialHealthInput.dialysis,
      initialHealthInput.insulin,
      initialHealthInput.oralDiet,
      initialHealthInput.comorbidities,
      initialHealthInput.allergies
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

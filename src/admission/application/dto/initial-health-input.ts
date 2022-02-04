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
    readonly diagnostics?: DiagnosticInput[],
    readonly comorbidities?: string[],
    readonly allergies?: string[],
    readonly lesion?: LesionInput
  ) {}

  static toEntity (initialHealthInput: InitialHealthInput, id?: string): InitialHealth {
    return new InitialHealth(
      !id ? new mongoose.Types.ObjectId().toString() : id,
      initialHealthInput.initialDescription,
      initialHealthInput?.mechanicalVentilation,
      initialHealthInput.dialysis,
      initialHealthInput.insulin,
      initialHealthInput.oralDiet
    ).addDiagnostics(initialHealthInput.diagnostics)
      .addAllergys(initialHealthInput.allergies)
      .addConsciousnessLevels(initialHealthInput.consciousnessLevels)
      .addComorbidities(initialHealthInput.comorbidities)
      .setLesion(initialHealthInput.lesion?.has, initialHealthInput.lesion?.type)
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

export class LesionInput {
  constructor (readonly has?: string, readonly type?: string) {
  }
}

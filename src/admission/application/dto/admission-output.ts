import Diet from 'src/admission/domain/entity/diet'
import { GoalInput } from 'src/admission/application/dto/finalize-admission-input'

export default class AdmissionOutput {
  constructor (readonly id: string,
    readonly caloricGoal: GoalInput,
    readonly proteinGoal: GoalInput,
    readonly diets: Diet[],
    readonly dateInternation?: Date,
    readonly dateInitialTherapy?: Date,
    readonly medicalConducts?: string[]
  ) {
  }
}

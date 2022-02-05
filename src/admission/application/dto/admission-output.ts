import { DietInput, GoalInput } from 'src/admission/application/dto/finalize-admission-input'

export default class AdmissionOutput {
  constructor (readonly id: string,
    readonly hospitalId?: string,
    readonly utiId?: string,
    readonly bedId?: string,
    readonly typeNutritional?: string,
    readonly foodInstrument?: string,
    readonly caloricGoal?: GoalInput,
    readonly proteinGoal?: GoalInput,
    readonly diets?: DietInput[],
    readonly dateInternation?: Date,
    readonly dateInitialTherapy?: Date,
    readonly medicalConducts?: string[]
  ) {
  }
}

import Admission from 'src/admission/domain/entity/admission'
import mongoose from 'mongoose'
import Diet from 'src/admission/domain/entity/diet'

export class FinalizeAdmissionInput {
  constructor (
    readonly hospitalId?: string,
    readonly utiId?: string,
    readonly bedId?: string,
    readonly typeNutritional?: string,
    readonly foodInstrument?: string,
    readonly dateInternation?: string,
    readonly dateInitialTherapy?: string,
    readonly medicalConduct?: string,
    readonly caloricGoal?: GoalInput,
    readonly proteinGoal?: GoalInput,
    readonly diet?: DietInput
  ) {
  }

  static toEntity (input: FinalizeAdmissionInput, id?: string): Admission {
    const admissionId = !id ? new mongoose.Types.ObjectId().toString() : id
    return new Admission(
      admissionId,
      input?.hospitalId,
      input?.utiId,
      input?.bedId,
      input?.typeNutritional,
      input?.foodInstrument,
      input?.dateInternation,
      input?.dateInitialTherapy,
      input?.medicalConduct
    )
      .setCaloricGoal(input?.caloricGoal?.min, input?.caloricGoal?.max)
      .setProteinGoal(input?.proteinGoal?.min, input?.proteinGoal?.max)
      .setDiet(new Diet(input.diet?.product, input.diet?.proposed, input.diet?.infused))
  }
}

export class GoalInput {
  constructor (readonly min?: number, readonly max?: number) {
  }
}

export class DietInput {
  constructor (readonly product?: string, readonly proposed?: number, readonly infused?: number) {
  }
}

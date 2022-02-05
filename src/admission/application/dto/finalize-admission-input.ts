import Admission from 'src/admission/domain/entity/admission'
import mongoose from 'mongoose'

export class FinalizeAdmissionInput {
  constructor (
    readonly hospitalId?: string,
    readonly utiId?: string,
    readonly bedId?: string,
    readonly typeNutritional?: string,
    readonly foodInstrument?: string,
    readonly dateInternation?: string,
    readonly dateInitialTherapy?: string,
    readonly medicalConducts?: string[],
    readonly caloricGoal?: GoalInput,
    readonly proteinGoal?: GoalInput,
    readonly diets?: DietInput[]
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
      input?.dateInitialTherapy
    )
      .setCaloricGoal(input?.caloricGoal?.min, input?.caloricGoal?.max)
      .setProteinGoal(input?.proteinGoal?.min, input?.proteinGoal?.max)
      .addDiets(input?.diets)
      .addMedicalConductss(input?.medicalConducts)
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

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import Admission from 'src/admission/domain/entity/admission'
import Goal from 'src/admission/domain/entity/goal'
import Diet from 'src/admission/domain/entity/diet'

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoAdmissionSchema {
  _id: any

  @Prop()
  hospitalId: string

  @Prop()
  utiId: string

  @Prop()
  bedId: string

  @Prop()
  typeNutritional: string

  @Prop()
  foodInstrument: string

  @Prop()
  dateInternation?: Date

  @Prop()
  dateInitialTherapy?: Date

  @Prop()
  medicalConducts: string[]

  @Prop()
  caloricGoal: Goal

  @Prop()
  proteinGoal: Goal

  @Prop()
  diets: Diet[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  static toEntity (admissionSchema: MongoAdmissionSchema): Admission {
    return new Admission(
      admissionSchema._id.toString(),
      admissionSchema.hospitalId,
      admissionSchema.utiId,
      admissionSchema.bedId,
      admissionSchema.typeNutritional,
      admissionSchema.foodInstrument,
      admissionSchema?.dateInternation?.toISOString(),
      admissionSchema?.dateInitialTherapy?.toISOString()
    )
      .setCaloricGoal(admissionSchema.caloricGoal.min, admissionSchema.caloricGoal.max)
      .setProteinGoal(admissionSchema.proteinGoal.min, admissionSchema.proteinGoal.max)
      .addDiets(admissionSchema.diets)
      .addMedicalConductss(admissionSchema.medicalConducts)
  }

  static toSchema (admission: Admission): MongoAdmissionSchema {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return <MongoAdmissionSchema>{
      _id: admission.id,
      hospitalId: admission.hospitalId,
      utiId: admission.utiId,
      bedId: admission.bedId,
      typeNutritional: admission.typeNutritional,
      foodInstrument: admission.foodInstrument,
      dateInternation: admission.getDateInternation(),
      dateInitialTherapy: admission.getDateInitialTherapy(),
      medicalConducts: admission.getMedicalConducts(),
      caloricGoal: admission.getCaloricGoal(),
      proteinGoal: admission.getProteinGoal(),
      diets: admission.getDiets()
    }
  }
}

export const MongoAdmissionModel = mongoose.model('Admissions', SchemaFactory.createForClass(MongoAdmissionSchema))

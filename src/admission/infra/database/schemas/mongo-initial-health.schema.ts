import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'
import Diagnostic from 'src/admission/domain/entity/diagnostic'
import InitialHealth from 'src/admission/domain/entity/initial-health'
import Lesion from 'src/admission/domain/entity/lesion'

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoInitialHealthSchema {
  _id: any

  @Prop()
  initialDescription: string

  @Prop()
  dialysis: string

  @Prop()
  insulin: string

  @Prop()
  oralDiet: string

  @Prop()
  diagnostics: Diagnostic[]

  @Prop()
  lesion: Lesion

  @Prop()
  comorbidities: string[]

  @Prop()
  allergies: string[]

  @Prop()
  mechanicalVentilation: MechanicalVentilation

  @Prop()
  consciousnessLevels: ConsciousnessLevel[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  static toSchema (initialHealth: InitialHealth): MongoInitialHealthSchema {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return <MongoInitialHealthSchema>{
      _id: initialHealth.id,
      initialDescription: initialHealth.initialDescription,
      dialysis: initialHealth.getDialysis().toString(),
      insulin: initialHealth.getInsulin().toString(),
      oralDiet: initialHealth.getOralDiet().toString(),
      diagnostics: initialHealth.getInitialDiagnosis(),
      comorbidities: initialHealth.getComorbidities(),
      allergies: initialHealth.getAllergies(),
      mechanicalVentilation: initialHealth.getMechanicalVentilation(),
      consciousnessLevels: initialHealth.getConsciousnessLevels(),
      lesion: initialHealth.getLesion()
    }
  }

  static toEntity (mongoInitialHealthSchema: MongoInitialHealthSchema): InitialHealth {
    return new InitialHealth(
      mongoInitialHealthSchema._id,
      mongoInitialHealthSchema.initialDescription,
      mongoInitialHealthSchema.mechanicalVentilation,
      mongoInitialHealthSchema.dialysis,
      mongoInitialHealthSchema.insulin,
      mongoInitialHealthSchema.oralDiet
    )
      .addDiagnostics(mongoInitialHealthSchema.diagnostics)
      .addAllergys(mongoInitialHealthSchema.allergies)
      .addConsciousnessLevels(mongoInitialHealthSchema.consciousnessLevels)
      .addComorbidities(mongoInitialHealthSchema.comorbidities)
      .setLesion(mongoInitialHealthSchema.lesion.has, mongoInitialHealthSchema.lesion.type)
  }
}

export const MongoInitialHealthModel = mongoose.model('InitialHealth', SchemaFactory.createForClass(MongoInitialHealthSchema))

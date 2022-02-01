import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation';
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level';
import Diagnostic from 'src/admission/domain/entity/diagnostic';
import InitialHealth from 'src/admission/domain/entity/initial-health';

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoInitialHealthSchema {
  _id: string;
  @Prop({index: true, unique: true})
  uuid: string;
  @Prop()
  initialDescription: string;
  @Prop()
  dialysis: string;
  @Prop()
  insulin: string;
  @Prop()
  oralDiet: string;
  @Prop()
  diagnostics: Array<Diagnostic>
  @Prop()
  comorbidities: Array<string>
  @Prop()
  allergies: Array<string>
  @Prop()
  mechanicalVentilation: MechanicalVentilation
  @Prop()
  consciousnessLevels: Array<ConsciousnessLevel>
  @Prop()
  pressureInjury?: string
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  static toSchema(initialHealth: InitialHealth): MongoInitialHealthSchema {
    return <MongoInitialHealthSchema>{
      uuid: initialHealth.id,
      initialDescription: initialHealth.initialDescription,
      dialysis: initialHealth.getDialysis(),
      insulin: initialHealth.getInsulin(),
      oralDiet: initialHealth.getOralDiet(),
      diagnostics: initialHealth.getInitialDiagnosis(),
      comorbidities: initialHealth.getComorbidities(),
      allergies: initialHealth.getAllergies(),
      mechanicalVentilation: initialHealth.getMechanicalVentilation(),
      consciousnessLevels: initialHealth.getConsciousnessLevels(),
      pressureInjury: initialHealth.pressureInjury
    };
  }
}


export const MongoInitialHealthSchemaModel = mongoose.model('InitialHealth', SchemaFactory.createForClass(MongoInitialHealthSchema));


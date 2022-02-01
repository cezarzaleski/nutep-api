import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import MechanicalVentilation from 'src/admission/domain/entity/mechanical-ventilation';
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level';
import Diagnostic from 'src/admission/domain/entity/diagnostic';

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoPatientHealthSchema {
  _id: string;
  @Prop()
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
}

export const MongoPatientHealthModel = mongoose.model('HealthPatients', SchemaFactory.createForClass(MongoPatientHealthSchema));


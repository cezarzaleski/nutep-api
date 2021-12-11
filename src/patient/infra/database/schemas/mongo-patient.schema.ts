import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Sex } from 'src/patient/domain/entity/sex';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoPatientSchema {

  _id: string;
  @Prop()
  uuid: string;
  @Prop()
  fullName: string;
  @Prop()
  birthday: Date;
  @Prop()
  sex: Sex;
  @Prop()
  hospitalizationStatus: HospitalizationStatus;
  @Prop()
  cpf: string;
  @Prop()
  register: string;
  @Prop()
  attendingPhysician: string;
  @Prop()
  healthCare: string;
  @Prop()
  linkPhoto: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const MongoPatientModel = mongoose.model('Patients', SchemaFactory.createForClass(MongoPatientSchema));


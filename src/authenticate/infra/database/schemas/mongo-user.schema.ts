import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoUserSchema {

  _id: string;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  createdAt: Date;
}

export const MongoUserModel = mongoose.model('User', SchemaFactory.createForClass(MongoUserSchema));


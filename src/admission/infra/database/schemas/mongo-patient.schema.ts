import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import Patient from 'src/admission/domain/entity/patient'

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoPatientSchema {
  _id: any

  @Prop()
  fullName: string

  @Prop()
  birthday: Date

  @Prop()
  sex: Sex

  @Prop()
  hospitalizationStatus: HospitalizationStatus

  @Prop()
  cpf: string

  @Prop()
  register: string

  @Prop()
  attendingPhysician: string

  @Prop()
  healthCare: string

  @Prop()
  linkPhoto: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'HealthPatients', index: true })
  health: MongoPatientSchema

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  static toEntity (patient: MongoPatientSchema): Patient {
    return new Patient(
      patient._id,
      patient.fullName,
      patient.birthday.toString(),
      patient.sex,
      patient.hospitalizationStatus,
      'hospitalId',
      patient.cpf,
      patient.register,
      patient.attendingPhysician,
      patient.healthCare,
      patient.linkPhoto
    )
  }

  static toSchema (patient: Patient): MongoPatientSchema {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return <MongoPatientSchema>{
      _id: patient.id,
      fullName: patient.getFullName(),
      birthday: patient.birthday,
      sex: patient.getSex(),
      hospitalizationStatus: patient.getHospitalizationStatus(),
      cpf: patient.getCpf()?.value,
      register: patient.register,
      attendingPhysician: patient.attendingPhysician,
      healthCare: patient.healthCare,
      linkPhoto: patient.linkPhoto
    }
  }
}

export const MongoPatientModel = mongoose.model('Patients', SchemaFactory.createForClass(MongoPatientSchema))

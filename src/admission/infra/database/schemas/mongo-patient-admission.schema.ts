import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import PatientAdmission from 'src/admission/domain/entity/patient-admission'
import { MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import { MongoInitialHealthSchema } from 'src/admission/infra/database/schemas/mongo-initial-health.schema'
import { MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema'

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoPatientAdmissionSchema {
  _id: any

  @Prop()
  status: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patients', index: true })
  patient: MongoPatientSchema

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'InitialHealth' })
  initialHealth?: MongoInitialHealthSchema

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admissions' })
  admission?: MongoAdmissionSchema

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  static toEntity (admissionSchema: MongoPatientAdmissionSchema): PatientAdmission {
    return new PatientAdmission(
      admissionSchema._id.toString(),
      admissionSchema.patient._id.toString(),
      admissionSchema.status
    ).setInitialHealth(admissionSchema?.initialHealth?._id.toString())
      .setAdmissionId(admissionSchema?.admission?._id.toString())
  }

  static toSchema (admission: PatientAdmission): MongoPatientAdmissionSchema {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mongoAdmissionSchema = <MongoPatientAdmissionSchema>{
      _id: admission.id,
      status: admission.status,
      patient: { _id: admission.patientId }
    }
    if (admission.getInitialHealthId()) { // @ts-expect-error
      mongoAdmissionSchema.initialHealth = { _id: admission.getInitialHealthId() }
    }
    if (admission.getAdmissionId()) { // @ts-expect-error
      mongoAdmissionSchema.admission = { _id: admission.getAdmissionId() }
    }
    return mongoAdmissionSchema
  }
}

export const MongoPatientAdmissionModel = mongoose.model('PatientAdmissions', SchemaFactory.createForClass(MongoPatientAdmissionSchema))

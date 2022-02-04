import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import Admission from 'src/admission/domain/entity/admission'
import { MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import { MongoInitialHealthSchema } from 'src/admission/infra/database/schemas/mongo-initial-health.schema'

@Schema({
  strict: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export class MongoAdmissionSchema {
  _id: any
  @Prop()
  status: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patients', index: true })
  patient: MongoPatientSchema

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'InitialHealth' })
  initialHealth?: MongoInitialHealthSchema

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  static toEntity (admissionSchema: MongoAdmissionSchema): Admission {
    return new Admission(
      admissionSchema._id.toString(),
      admissionSchema.patient._id.toString(),
      admissionSchema.status
    ).setInitialHealth(admissionSchema?.initialHealth?._id.toString())
  }

  static toSchema (admission: Admission): MongoAdmissionSchema {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mongoAdmissionSchema = <MongoAdmissionSchema>{
      _id: admission.id,
      status: admission.status,
      patient: { _id: admission.patientId }
    }
    if (admission.getInitialHealthId()) { // @ts-expect-error
      mongoAdmissionSchema.initialHealth = { _id: admission.getInitialHealthId() }
    }
    return mongoAdmissionSchema
  }
}

export const MongoAdmissionModel = mongoose.model('Admissions', SchemaFactory.createForClass(MongoAdmissionSchema))

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Admission from 'src/admission/domain/entity/admission';
import { MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema';

@Schema({
  strict: false, timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
})
export class MongoAdmissionSchema {
  _id: any;
  @Prop()
  status: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Patients', index: true})
  patient: MongoPatientSchema
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'HealthPatients'})
  health?: MongoAdmissionSchema
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  static toEntity(admissionSchema: MongoAdmissionSchema): Admission {
    return new Admission(
      admissionSchema._id.toString(),
      admissionSchema.patient._id.toString(),
      admissionSchema.status
    )
  }

  static toSchema(admission: Admission): MongoAdmissionSchema {
    return <MongoAdmissionSchema>{
      _id: admission.id,
      status: admission.status,
      patient: {_id: admission.patientId}
    };
  }
}

export const MongoAdmissionModel = mongoose.model('Admissions', SchemaFactory.createForClass(MongoAdmissionSchema));


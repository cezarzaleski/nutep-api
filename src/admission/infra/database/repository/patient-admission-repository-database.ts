import mongoose from 'mongoose'
import PatientAdmissionRepository from 'src/admission/domain/repository/patient-admission-repository'
import PatientAdmission from 'src/admission/domain/entity/patient-admission'
import { MongoPatientAdmissionModel, MongoPatientAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-patient-admission.schema'
import NotFoundError from 'src/shared/exception/not-found'

export default class PatientAdmissionRepositoryDatabase implements PatientAdmissionRepository {
  private readonly admissionModel: mongoose.Model<mongoose.Document>
  constructor (
  ) {
    this.admissionModel = MongoPatientAdmissionModel
  }

  async save (admission: PatientAdmission): Promise<PatientAdmission> {
    const admissionSaved: any = await this.admissionModel.create(MongoPatientAdmissionSchema.toSchema(admission))
    return MongoPatientAdmissionSchema.toEntity(admissionSaved)
  }

  async findById (id: string): Promise<PatientAdmission> {
    // @ts-expect-error
    const admission: MongoPatientAdmissionSchema = await this.admissionModel.findOne({ _id: id })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (admission) return MongoPatientAdmissionSchema.toEntity(admission)
    throw new NotFoundError('PatientAdmission')
  }

  async update (id: string, admission: PatientAdmission): Promise<PatientAdmission> {
    const admissionSaved: any = await this.admissionModel
      .findOneAndUpdate({ _id: id }, MongoPatientAdmissionSchema.toSchema(admission))
    return MongoPatientAdmissionSchema.toEntity(admissionSaved)
  }
}

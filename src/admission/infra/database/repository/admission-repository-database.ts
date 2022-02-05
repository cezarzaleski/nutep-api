import mongoose from 'mongoose'
import NotFoundError from 'src/shared/exception/not-found'
import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema'
import Admission from 'src/admission/domain/entity/admission'

export default class AdmissionRepositoryDatabase implements AdmissionRepository {
  private readonly admissionModel: mongoose.Model<mongoose.Document>
  constructor (
  ) {
    this.admissionModel = MongoAdmissionModel
  }

  async save (admission: Admission): Promise<Admission> {
    const admissionSaved: any = await this.admissionModel.create(MongoAdmissionSchema.toSchema(admission))
    return MongoAdmissionSchema.toEntity(admissionSaved)
  }

  async findById (id: string): Promise<Admission> {
    const admissionSchema: any = await this.admissionModel.findOne({ _id: id })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (admissionSchema) return MongoAdmissionSchema.toEntity(admissionSchema)
    throw new NotFoundError('admission')
  }

  async update (id: string, admission: Admission): Promise<Admission> {
    const admissionSchema: any = await this.admissionModel
      .findOneAndUpdate({ _id: id }, MongoAdmissionSchema.toSchema(admission))
    return MongoAdmissionSchema.toEntity(admissionSchema)
  }
}

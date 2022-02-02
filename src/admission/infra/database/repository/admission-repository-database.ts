import mongoose from 'mongoose';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';
import Admission from 'src/admission/domain/entity/admission';
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema';
import NotFoundError from 'src/shared/exception/not-found';

export default class AdmissionRepositoryDatabase implements AdmissionRepository {
  private readonly admissionModel: mongoose.Model<mongoose.Document>
  constructor(
  ) {
    this.admissionModel = MongoAdmissionModel
  }

  async save(admission: Admission): Promise<Admission> {
    const admissionSaved: any = await this.admissionModel.create(MongoAdmissionSchema.toSchema(admission));
    return MongoAdmissionSchema.toEntity(admissionSaved)
  }

  async findById(id: string): Promise<Admission> {
    // @ts-ignore
    const admission: MongoAdmissionSchema = await this.admissionModel.findOne({_id: id});
    if (admission) return MongoAdmissionSchema.toEntity(admission)
    throw new NotFoundError('Admission')
  }
}

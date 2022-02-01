import mongoose from 'mongoose';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';
import Admission from 'src/admission/domain/entity/admission';
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema';

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
}

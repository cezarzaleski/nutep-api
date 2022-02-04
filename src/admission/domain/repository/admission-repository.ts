import Admission from 'src/admission/domain/entity/admission'

export default interface AdmissionRepository {
  save: (admission: Admission) => Promise<Admission>
  findById: (id: string) => Promise<Admission>
  update: (id: string, admission: Admission) => Promise<Admission>
}

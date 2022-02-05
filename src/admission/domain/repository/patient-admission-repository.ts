import PatientAdmission from 'src/admission/domain/entity/patient-admission'

export default interface PatientAdmissionRepository {
  save: (admission: PatientAdmission) => Promise<PatientAdmission>
  findById: (id: string) => Promise<PatientAdmission>
  update: (id: string, admission: PatientAdmission) => Promise<PatientAdmission>
}

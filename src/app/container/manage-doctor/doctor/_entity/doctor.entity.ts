export class Doctor {
  id: number;
  tel: string;
  name: string;
  hospitalId: number;
  departmentId: number;
  doctorTitleId: number;
  avatarUrl: string;
  certificationUrl: string;
  description: string;
  state: boolean;
  failureReason: string;

  constructor(obj?: Doctor) {
    this.id = obj && obj.id || 0;
    this.tel = obj && obj.tel || '';
    this.name = obj && obj.name || '';
    this.hospitalId = obj && obj.hospitalId || 1;
    this.departmentId = obj && obj.departmentId || 1;
    this.doctorTitleId = obj && obj.doctorTitleId || 1;
    this.avatarUrl = obj && obj.avatarUrl || '';
    this.certificationUrl = obj && obj.certificationUrl || '';
    this.description = obj && obj.description || '';
    this.state = obj && obj.state || null;
  }
}

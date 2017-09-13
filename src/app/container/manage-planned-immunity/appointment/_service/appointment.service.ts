import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getData: '/api/planImmunization/checkPlanImmunizationList'
};

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getData(page, planImmunizationNum?, status?, reservationDate?, telephone?, organizationId?) {
    let query = `?flag=${page}`;
    if (planImmunizationNum) {
      // query +=
    }
    return this.http.get(`${this.app.api_url}${PATH.getData}`);
  }

  setAppointmentConfig() {
    return new ContainerConfig({
      title: '计划免疫预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/planned-immunity/appointment'
    });
  }
}

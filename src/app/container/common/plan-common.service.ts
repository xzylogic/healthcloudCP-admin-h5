import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';

const PATH = {
  getDefault: '/api/appointmentTime/getDateList',
  saveDefault: '/api/appointmentTime/saveDate',
};

@Injectable()
export class PlanCommonService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getDefault(type, date) {
    return this.http.get(`${this.app.api_url}${PATH.getDefault}?type=${type}&dates=${date}`);
  }

  saveDefault(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveDefault}`, data);
  }

  setPlanConfig(title, router, date) {
    return new ContainerConfig({
      title: title,
      subTitle: `特殊日期设置：${date}`,
      ifHome: false,
      homeRouter: router
    });
  }
}

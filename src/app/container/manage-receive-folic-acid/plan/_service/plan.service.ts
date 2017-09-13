import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getWeekList: '/api/appointmentTime/getWeekList',
  saveWeekList: '/api/appointmentTime/saveWeek',
  getTimeList: '/api/appointmentTime/getWeekTimeList',
  saveTimeList: '/api/appointmentTime/saveWeekTime',
  getDays: '/api/appointmentTime/getDates'
};

@Injectable()
export class PlanService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getWeekList() {
    return this.http.get(`${this.app.api_url}${PATH.getWeekList}?type=ys`);
  }

  saveWeekList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveWeekList}`, data);
  }

  getTimeList() {
    return this.http.get(`${this.app.api_url}${PATH.getTimeList}?type=ys`);
  }

  saveTimeList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveTimeList}`, data);
  }

  getDays() {
    return this.http.get(`${this.app.api_url}${PATH.getDays}?type=ys`);
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '叶酸领取预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/receive-folic-acid/plan'
    });
  }
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getWeekList: '/api/appointmentTime/getWeekList',
  saveWeekList: '/api/appointmentTime/saveWeek',
  getTimeList: '/api/appointmentTime/getWeekTimeList',
  saveTimeList: '/api/appointmentTime/saveWeekTime',
  getCommunity: '/api/appointmentTime/getAllCommunityByUserId',
  getDays: '/api/appointmentTime/getDates'
};

@Injectable()
export class PlanService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  getWeekList() {
    return this.http.get(`${this.app.api_url}${PATH.getWeekList}?type=tj`);
  }

  saveWeekList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveWeekList}`, data);
  }

  getTimeList() {
    return this.http.get(`${this.app.api_url}${PATH.getTimeList}?type=tj`);
  }

  saveTimeList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveTimeList}`, data);
  }

  getDays() {
    return this.http.get(`${this.app.api_url}${PATH.getDays}?type=tj`);
  }

  getCommunity() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunity}?userId=${this.auth.getAdminId()}&type=tj`);
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '儿童体检预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/pe-for-children/plan'
    });
  }
}

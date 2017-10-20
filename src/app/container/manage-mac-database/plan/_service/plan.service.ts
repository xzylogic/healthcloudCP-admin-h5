import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getWeekList: '/api/appointmentTime/getWeekList',
  saveWeekList: '/api/appointmentTime/saveWeek',
  getTimeList: '/api/appointmentTime/getWeekTimeList',
  saveTimeList: '/api/appointmentTime/saveWeekTime',
  getCommunityAll: '/api/getAllCommunityByUserId',
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

  getWeekList(orgId) {
    return this.http.get(`${this.app.api_url}${PATH.getWeekList}?type=jd&organizationId=${orgId}`);
  }

  saveWeekList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveWeekList}`, data);
  }

  getTimeList(orgId) {
    return this.http.get(`${this.app.api_url}${PATH.getTimeList}?type=jd&organizationId=${orgId}`);
  }

  saveTimeList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveTimeList}`, data);
  }

  getDays(orgId) {
    return this.http.get(`${this.app.api_url}${PATH.getDays}?type=jd&organizationId=${orgId}`);
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}`);
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '母子建档预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/mac-database/plan'
    });
  }
}

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
  getWeekList(orgId) {
    let query = '?type=jm';
    if (orgId) {
      query += `&organizationId=${orgId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getWeekList}${query}`);
  }

  saveWeekList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveWeekList}`, data);
  }

  getTimeList(orgId) {
    let query = '?type=jm';
    if (orgId) {
      query += `&organizationId=${orgId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getTimeList}${query}`);
  }

  saveTimeList(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveTimeList}`, data);
  }

  getDays(orgId) {
    let query = '?type=jm';
    if (orgId) {
      query += `&organizationId=${orgId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getDays}${query}`);
  }

  getCommunity() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunity}?userId=${this.auth.getAdminId()}&type=jm`);
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '计划免疫预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/planned-immunity/plan'
    });
  }
}

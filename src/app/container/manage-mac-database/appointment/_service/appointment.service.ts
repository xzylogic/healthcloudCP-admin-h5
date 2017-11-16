import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getData: '/api/motherAndChildFile/checkMotherAndChildFileList',
  // getCommunityAll: '/api/getAllCommunityByUserId',
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
  getDetail: '/api/motherAndChildFile/check',
  saveDetail: '/api/motherAndChildFile/updateInfo'
};

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  getData(page, status?, num?, name?, date?, oId?) {
    let query = `?flag=${page + 1}`;
    if (status || status == 0) {
      query += `&status=${status}`;
    }
    if (name) {
      query += `&name=${name}`;
    }
    if (num) {
      query += `&motherAndChildFileNum=${num}`;
    }
    if (date) {
      query += `&reservationDate=${date}`;
    }
    if (oId) {
      query += `&organizationId=${oId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getData}${query}`);
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=jd`);
  }

  getDetail(id) {
    return this.http.get(`${this.app.api_url}${PATH.getDetail}?id=${id}`);
  }

  saveDetail(id, status, reason) {
    return this.http.post(
      `${this.app.api_url}${PATH.saveDetail}?id=${id}&status=${status}&reason=${reason}&addUserId=${this.auth.getAdminId()}`, {});
  }

  setAppointmentConfig() {
    return new ContainerConfig({
      title: '母子建档预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/mac-database/appointment'
    });
  }

  setAppointmentDetailConfig() {
    return new ContainerConfig({
      title: '母子建档预约',
      subTitle: '预约详情',
      ifHome: false,
      homeRouter: '/mac-database/appointment',
      query: {flag: 1}
    });
  }

  setAppointmentTitles() {
    return [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '联系电话',
        key: 'motherContactNumber'
      }),
      new TableTitle({
        name: '申请日期',
        key: 'applicationTime'
      }),
      new TableTitle({
        name: '预约时间',
        key: 'reservationDate'
      }),
      new TableTitle({
        name: '预约单号',
        key: 'motherChildFileNum'
      }),
      new TableTitle({
        name: '所属机构',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '订单状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '操作',
        key: '',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: ''
        }]
      }),
    ];
  }
}

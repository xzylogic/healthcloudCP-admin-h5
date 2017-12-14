import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getData: '/api/planImmunization/checkPlanImmunizationList',
  // getCommunityAll: '/api/getAllCommunityByUserId',
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
  getDetail: '/api/planImmunization/check',
  saveDetail: '/api/planImmunization/updateInfo'
};

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  getData(page, planImmunizationNum?, status?, name?, reservationDate?, telephone?, organizationId?) {
    let query = `?flag=${page + 1}`;
    if (planImmunizationNum) {
      query += `&planImmunizationNum=${planImmunizationNum}`;
    }
    if (status || status == 0) {
      query += `&status=${status}`;
    }
    if (name) {
      query += `&name=${name}`;
    }
    if (reservationDate) {
      query += `&reservationDate=${reservationDate}`;
    }
    if (telephone) {
      query += `&telephone=${telephone}`;
    }
    if (organizationId) {
      query += `&organizationId=${organizationId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getData}${query}`);
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=jm`);
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
      title: '计划免疫预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/planned-immunity/appointment'
    });
  }

  setAppointmentDetailConfig(route) {
    return new ContainerConfig({
      title: '计划免疫预约',
      subTitle: '预约详情',
      ifHome: false,
      homeRouter: ['/planned-immunity', 'appointment', route],
      query: {flag: 1},
      back: true
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
        name: '宝宝姓名',
        key: 'name',
        controlType: ControlType.option,
        option: 'insert_drive_file'
      }),
      new TableTitle({
        name: '宝宝生日',
        key: 'birthDate'
      }),
      new TableTitle({
        name: '家长姓名',
        key: 'motherName'
      }),
      new TableTitle({
        name: '家长手机号',
        key: 'motherTelephone'
      }),
      new TableTitle({
        name: '预约单号',
        key: 'planImmunizationNum'
      }),
      new TableTitle({
        name: '预约机构',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '预约时间',
        key: 'reservationDate'
      }),
      new TableTitle({
        name: '登记状态',
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

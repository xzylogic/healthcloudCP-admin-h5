import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

const PATH = {
  getDataList: '/api/followDuringPregnancy/checkFollowDuringPregnancyList',
  getDataDetail: '/api/followDuringPregnancy/getList',
  saveDetail: '/api/followDuringPregnancy/save',
  // getCommunityAll: '/api/getAllCommunityByUserId',
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
};

@Injectable()
export class PregnancyInterviewService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http,
  ) {
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=ys`);
  }

  getData(page, size, name, tel, period, status, hospital) {
    let query = `?flag=${page}`;
    if (name) {
      query += `&name=${name}`;
    }
    if (tel) {
      query += `&telephone=${tel}`;
    }
    if (period) {
      query += `&pregnancyPeriod=${period}`;
    }
    if (status) {
      query += `&status=${status - 1}`;
    }
    if (hospital) {
      query += `&organizationId=${hospital}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.getDataList}${query}`);
  }

  getDetail(id, hospitalId) {
    return this.http.get(`${this.app.api_url}${PATH.getDataDetail}?addUserId=1&hospitalId=111`);
  }

  saveDetail(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveDetail}`, data);
  }

  setPregnancyInterviewConfig() {
    return new ContainerConfig({
      title: '孕期随访管理',
      subTitle: '孕期随访信息',
      ifHome: true,
      homeRouter: '/pregnancy-interview'
    });
  }

  setPregnancyInterviewDetailConfig() {
    return new ContainerConfig({
      title: '孕期随访管理',
      subTitle: '孕期随访详情',
      ifHome: false,
      homeRouter: '/pregnancy-interview'
    });
  }

  setTitles() {
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
        key: 'phone'
      }),
      new TableTitle({
        name: '随访阶段',
        key: 'pregnancyPeriod'
      }),
      new TableTitle({
        name: '已随访次数',
        key: 'times'
      }),
      new TableTitle({
        name: '所属机构',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '随访状态',
        key: 'status'
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

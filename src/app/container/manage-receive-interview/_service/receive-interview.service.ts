import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

const PATH = {
  getDataList: '/folic/followup/list',
  getDetail: '/folic/followup/details',
  // getCommunityAll: '/api/getAllCommunityByUserId',
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
  saveDetail: '/folic/followup/save',
  delDetail: '/folic/followup/delete'

};

@Injectable()
export class ReceiveInterviewService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http,
  ) {
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=ys`);
  }

  getDataList(page, size, username?, telephone?, personcard?, status?, hospital?) {
    const query: any = {number: page + 1, size: size, parameter: {}};
    if (username) {
      query.parameter.userName = username;
    }
    if (telephone) {
      query.parameter.telephone = telephone;
    }
    if (personcard) {
      query.parameter.personcard = personcard;
    }
    if (status) {
      query.parameter.followStatus = status - 1;
    }
    if (hospital) {
      query.parameter.hospitalId = hospital;
    }
    return this.http.post(`${this.app.api_url}${PATH.getDataList}`, query);
  }

  getDataDetail(card) {
    return this.http.get(`${this.app.api_url}${PATH.getDetail}?personcard=${card}`);
  }

  saveDetail(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveDetail}`, data);
  }

  delDetail(id) {
    return this.http.get(`${this.app.api_url}${PATH.delDetail}?id=${id}`);
  }

  setReceiveInterviewConfig() {
    return new ContainerConfig({
      title: '叶酸随访管理',
      subTitle: '叶酸随访信息',
      ifHome: true,
      homeRouter: '/receive-interview'
    });
  }

  setReceiveInterviewDetailConfig() {
    return new ContainerConfig({
      title: '叶酸随访管理',
      subTitle: '叶酸随访详情',
      ifHome: false,
      homeRouter: '/receive-interview',
      back: true
    });
  }

  getTitles() {
    return [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '姓名',
        key: 'userName'
      }),
      new TableTitle({
        name: '证件号码',
        key: 'personcard'
      }),
      new TableTitle({
        name: '联系电话',
        key: 'telephone'
      }),
      new TableTitle({
        name: '随访状态',
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

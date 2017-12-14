import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

const PATH = {
  getDataList: '/api/followDuringPregnancy/checkList',
  getDataDetail: '/api/followDuringPregnancy/getList',
  saveDetail: '/api/followDuringPregnancy/save',
  sendMessage: '/api/followDuringPregnancy/pushMessage',
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
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=jd`);
  }

  getData(page, size, name, tel, period, status, hospital) {
    let query = `?flag=${page + 1}`;
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

  getDetail(id) {
    // return this.http.get(`/json/interview.json`);
    return this.http.get(`${this.app.api_url}${PATH.getDataDetail}?id=${id}`);
  }

  saveDetail(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveDetail}`, data);
  }

  sendMessage(id, pregnancy) {
    return this.http.get(`${this.app.api_url}${PATH.sendMessage}?id=${id}&pregnancy=${pregnancy}`);
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
      homeRouter: '/pregnancy-interview',
      back: true
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
        key: 'name',
        controlType: ControlType.option,
        option: 'insert_drive_file'
      }),
      new TableTitle({
        name: '联系电话',
        key: 'telephone'
      }),
      new TableTitle({
        name: '随访阶段',
        key: 'pregnancyPeriodStr'
      }),
      new TableTitle({
        name: '所属机构',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '随访状态',
        key: 'state',
        controlType: ControlType.pipe,
        option: {
          key: [0, 1, 2],
          value: ['待随访', '在线随访', '电话随访']
        }
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

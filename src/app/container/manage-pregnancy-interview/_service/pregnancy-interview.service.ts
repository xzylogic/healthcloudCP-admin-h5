import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

const PATH = {
  getDataList: '',
  getDataDetail: '/api/followDuringPregnancy/getList',
  saveDetail: '/api/followDuringPregnancy/save'
};

@Injectable()
export class PregnancyInterviewService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
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

  getData() {
    return this.http.get(`${this.app.api_url}${PATH.getDataList}`);
  }

  getDetail(id, hospitalId) {
    return this.http.get(`${this.app.api_url}${PATH.getDataDetail}?addUserId=1&hospitalId=111`);
  }

  saveDetail(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveDetail}`, data);
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

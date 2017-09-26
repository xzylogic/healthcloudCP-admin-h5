import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getData: '/api/motherAndChildFile/checkMotherAndChildFileList',
  getCommunityAll: '/api/getAllCommunityByUserId',
  getDetail: '/api/motherAndChildFile/save',
  saveDetail: '/api/planImmunization/updateInfo'
};

@Injectable()
export class AppointmentService {
  constructor() {
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
      homeRouter: '/mac-database/appointment'
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

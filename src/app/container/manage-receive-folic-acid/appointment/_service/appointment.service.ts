import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getData: '/admin/folic/list',
  // getCommunityAll: '/api/getAllCommunityByUserId',
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
  getDetail: '/admin/folic/details',
  saveDetail: '/admin/folic/check',
  getSurvey: '/admin/folic/surveyResult',
  batchAudit: '/admin/folic/batchThrough'
};

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  getData(page, size, name?, cardNo?, num?, status?, menuId?, phone?) {
    const param: any = {};
    if (name) {
      param.name = name;
    }
    if (cardNo) {
      param.cardNo = cardNo;
    }
    if (num) {
      param.orderNum = num;
    }
    if (status) {
      param.checked = status - 1;
    }
    if (menuId) {
      param.hospitalId = menuId;
    }
    if (phone) {
      param.phone = phone;
    }
    return this.http.post(`${this.app.api_url}${PATH.getData}`, {
      flag: page + 1, // 当前页码
      pageSize: size, // 一页多少条数据
      parameter: param
    });
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}&type=ys`);
  }

  getDetail(id) {
    return this.http.get(`${this.app.api_url}${PATH.getDetail}?reservationId=${id}`);
  }

  saveDetail(id, status, reason) {
    return this.http.get(`${this.app.api_url}${PATH.saveDetail}?reservationId=${id}&checked=${status}&noCheckResult=${reason}`);
  }

  getSurvey(id) {
    return this.http.get(`${this.app.api_url}${PATH.getSurvey}?reservationId=${id}`);
  }

  batchAudit(ids) {
    return this.http.post(`${this.app.api_url}${PATH.batchAudit}`, ids);
  }

  setAppointmentConfig() {
    return new ContainerConfig({
      title: '叶酸领取预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/receive-folic-acid/appointment'
    });
  }

  setAppointmentDetailConfig() {
    return new ContainerConfig({
      title: '叶酸领取预约',
      subTitle: '预约详情',
      ifHome: false,
      homeRouter: '/receive-folic-acid/appointment',
      query: {flag: 1},
      back: true
    });
  }

  setAppointmentTitles(flag) {
    const Titles = [];
    if (flag) {
      Titles.push(
        new TableTitle({
          name: '',
          key: 'reservationId',
          controlType: ControlType.checkbox,
          option: {
            key: 'checked',
            value: '0'
          }
        })
      );
    }
    Titles.push(
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
        name: '证件号码',
        key: 'cardNo'
      }),
      new TableTitle({
        name: '联系电话',
        key: 'tel'
      }),
      new TableTitle({
        name: '预约单号',
        key: 'orderNum'
      }),
      new TableTitle({
        name: '预约机构',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '申请日期',
        key: 'applicationTime'
      }),
      new TableTitle({
        name: '预约时间',
        key: 'reservationTimeStr'
      }),
      new TableTitle({
        name: '审核状态',
        key: 'status'
      }),
      new TableTitle({
        name: '操作',
        key: '',
        controlType: ControlType.buttons,
        minwidth: 65,
        option: [{
          key: 'edit',
          name: ''
        }]
      })
    );
    return Titles;
  }
}

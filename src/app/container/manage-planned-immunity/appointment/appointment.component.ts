import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import * as moment from 'moment';

@Component({
  selector: 'app-planned-immunity-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit {
  containerConfig: ContainerConfig;
  appointmentTable: TableOption;
  telephone = '';
  date: Date;
  name = '';
  number = '';
  status = '';
  centerId = '';
  siteId = '';
  centerList: Array<any>;
  siteList: Array<any>;
  departmentList: Array<any>;
  communityList: Array<any>;
  statusList = [{
    id: '',
    name: '全部'
  }, {
    id: 1,
    name: '待处理'
  }, {
    id: 2,
    name: '正常体检'
  }, {
    id: 4,
    name: '接种取消'
  }, {
    id: 5,
    name: '接种爽约'
  }, {
    id: 3,
    name: '用户取消'
  }];

  constructor(@Inject('appointment') private appointmentService) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentConfig();
    this.appointmentTable = new TableOption({
      titles: this.appointmentService.setAppointmentTitles(),
      ifPage: true
    });
    this.getCommunityAll();
    this.getData(0);
  }

  reset() {
    this.telephone = '';
    this.date = null;
    this.name = '';
    this.number = '';
    this.status = '';
    this.centerId = '';
    this.siteId = '';
    this.getCenter(this.communityList);
    this.getSite(this.communityList);
    this.getDepartment(this.communityList);
    this.getData(0);
  }

  search() {
    this.getData(0);
  }

  getData(page) {
    this.appointmentTable.reset(page);
    this.appointmentService.getData(
      page, this.number, this.status, this.name,
      this.date && moment(new Date(this.date)).format('YYYY-MM-DD') || '',
      this.telephone, this.siteId || this.centerId
    )
      .subscribe(res => {
        this.appointmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.appointmentTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.appointmentTable.totalPage = res.data.extras.totalPage || '';
          this.appointmentTable.lists = res.data.content;
          this.formatData(this.appointmentTable.lists);
        } else {
          this.appointmentTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.appointmentTable.loading = false;
        console.log(err);
        this.appointmentTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    console.log(data);
  }

  formatData(data) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        if (obj.status == 1) {
          obj.statusName = '待处理';
        }
        if (obj.status == 2) {
          obj.statusName = '正常接种';
        }
        if (obj.status == 3) {
          obj.statusName = '用户取消';
        }
        if (obj.status == 4) {
          obj.statusName = '接种取消';
        }
        if (obj.status == 5) {
          obj.statusName = '接种爽约';
        }
        obj.edit = obj.status == 1 ? '预约登记' : '查看';
      });
    }
  }

  getCommunityAll() {
    this.appointmentService.getCommunityAll()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.communityList = res.data;
          this.getCenter(res.data);
          this.getSite(res.data);
          this.getDepartment(res.data);
        }
      });
  }

  // 获取中心列表
  getCenter(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 1) {
          center.push(obj);
        }
      });
      this.centerList = center;
    }
  }

  // 获取站点列表
  getSite(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 2) {
          center.push(obj);
        }
      });
      this.siteList = center;
    }
  }

  // 获取部门列表
  getDepartment(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 3) {
          center.push(obj);
        }
      });
      this.departmentList = center;
    }
  }

  centerChange(data) {
    this.siteId = '';
    const site = [{menuId: '', name: '无'}];
    this.communityList.forEach(obj => {
      if (obj.parentId === data.value && obj.type == 2) {
        site.push(obj);
      }
    });
    if (site.length !== 1) {
      site.splice(0, 1);
    }
    this.siteList = site;
    console.log(this.siteList);
  }
}

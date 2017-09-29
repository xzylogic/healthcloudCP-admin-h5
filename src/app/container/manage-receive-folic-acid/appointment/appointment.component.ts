import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-folic-acid-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit {
  containerConfig: ContainerConfig;
  appointmentTable: TableOption;
  name = '';
  cardNo = '';
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
    name: '待审核'
  }, {
    id: 2,
    name: '审核通过'
  }, {
    id: 3,
    name: '审核未通过'
  }];

  constructor(
    @Inject('appointment') private appointmentService,
    private router: Router
  ) {
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
    this.name = '';
    this.cardNo = '';
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
    // console.log(this.status);
    this.appointmentTable.reset(page);
    this.appointmentService.getData(
      page, this.appointmentTable.size, this.name,
      this.cardNo, this.number, this.status,
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.appointmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.data && res.data.data.length === 0) {
          this.appointmentTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.data) {
          this.appointmentTable.totalPage = res.data.totalPages || '';
          this.appointmentTable.lists = res.data.data;
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
    // console.log(data);
    if (data.key === 'edit') {
      this.router.navigate(['/receive-folic-acid/appointment/detail', data.value.reservationId]);
    }
  }

  formatData(data) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        if (obj.checked == 0) {
          obj.status = '待审核';
        }
        if (obj.checked == 1) {
          obj.status = '审核通过';
        }
        if (obj.checked == 2) {
          obj.status = '审核未通过';
        }
        obj.edit = obj.checked == 0 ? '审核' : '查看';
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
    // console.log(this.siteList);
  }
}

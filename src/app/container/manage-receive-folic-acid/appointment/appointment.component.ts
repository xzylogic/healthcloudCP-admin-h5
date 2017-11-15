import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-receive-folic-acid-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit {
  paramsMenu: string;
  containerConfig: ContainerConfig;
  appointmentTable: TableOption;
  @select(['receive-folic-acid', 'data']) data: Observable<any>;
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
    @Inject('action') private action,
    @Inject('appointment') private appointmentService,
    private dialog: MatDialog,
    private router: Router,
    private param: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.param.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
      }
    });
    this.containerConfig = this.appointmentService.setAppointmentConfig();
    this.appointmentTable = new TableOption({
      titles: this.appointmentService.setAppointmentTitles(),
      ifPage: true
    });
    // this.param.queryParams.subscribe(params => {
    //   if (params && params.flag) {
    this.data.subscribe(data => {
      if (data) {
        this.name = data.name;
        this.cardNo = data.cardNo;
        this.number = data.number;
        this.status = data.status;
        this.centerId = data.centerId;
        this.siteId = data.siteId;
        this.getData(data.page);
      } else {
        this.reset();
      }
    });
    //   } else {
    //     this.reset();
    //   }
    // });
    this.getCommunityAll();
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
    this.appointmentTable.reset(page);
    this.appointmentService.getData(
      page, this.appointmentTable.size, this.name,
      this.cardNo, this.number, this.status,
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.appointmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.data) {
          this.appointmentTable.totalPage = res.data.totalPages || '';
          this.appointmentTable.lists = res.data.data;
          this.formatData(this.appointmentTable.lists, res.data.operation);
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
    if (data.key === 'edit') {
      this.action.dataChange('receive-folic-acid', {
        name: this.name,
        cardNo: this.cardNo,
        number: this.number,
        status: this.status,
        centerId: this.centerId,
        siteId: this.siteId,
        page: this.appointmentTable.currentPage
      });
      this.router.navigate(['/receive-folic-acid/appointment', this.paramsMenu, 'detail', data.value.reservationId]);
    }
    if (data.key === 'name' && data.value && data.value.cardNo) {
      this.action.dataChange('receive-folic-acid', {
        name: this.name,
        cardNo: this.cardNo,
        number: this.number,
        status: this.status,
        centerId: this.centerId,
        siteId: this.siteId,
        page: this.appointmentTable.currentPage
      });
      this.router.navigate(['health-file', data.value.cardNo]);
    }
    if (data.key === 'name' && data.value && !data.value.cardNo) {
      HintDialog('该用户无健康档案信息！', this.dialog);
    }
  }

  formatData(data, operation) {
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
        obj.edit = (obj.checked == 0 && operation == 1) ? '审核' : '查看';
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
    if (data.value) {
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
    }
  }
}

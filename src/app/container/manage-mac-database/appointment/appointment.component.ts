import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-mac-database-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  paramsMenu: string;

  subscribeRoute: any;
  subscribeList: any;
  subscribeDialog: any;
  subscribeCommunity: any;
  subscribeAudit: any;

  containerConfig: ContainerConfig;
  appointmentTable: TableOption;
  flag = false;

  @select(['mac-database', 'data']) data: Observable<any>;
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
    id: 0,
    name: '待审核'
  }, {
    id: 1,
    name: '审核通过'
  }, {
    id: 2,
    name: '审核未通过'
  }];

  constructor(
    @Inject('action') private action,
    @Inject('appointment') private appointmentService,
    @Inject('health') private healthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentConfig();
    this.appointmentTable = new TableOption({
      // titles: this.appointmentService.setAppointmentTitles(),
      ifPage: true
    });
    this.getCommunityAll();
    this.subscribeRoute = Observable.zip(
      this.route.params, this.data,
      (route, data) => ({route, data})
    ).subscribe(res => {
      if (res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.data) {
        this.date = res.data.date;
        this.name = res.data.name;
        this.number = res.data.number;
        this.status = res.data.status;
        this.centerId = res.data.centerId;
        this.siteId = res.data.siteId;
        this.getData(res.data.page);
      } else {
        this.reset();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeList) {
      this.subscribeList.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeCommunity) {
      this.subscribeCommunity.unsubscribe();
    }
    if (this.subscribeAudit) {
      this.subscribeAudit.unsubscribe();
    }
  }

  reset() {
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
    this.action.dataChange('mac-database', {
      date: this.date,
      name: this.name,
      number: this.number,
      status: this.status,
      centerId: this.centerId,
      siteId: this.siteId,
      page: this.appointmentTable.currentPage
    });
    this.subscribeList = this.appointmentService.getData(
      page, this.status, this.number, this.name,
      this.date && moment(new Date(this.date)).format('YYYY-MM-DD') || '',
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.appointmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.content) {
          this.appointmentTable.totalPage = res.data.extras.totalPage || '';
          this.appointmentTable.titles = this.appointmentService.setAppointmentTitles(res.data.extras.operation == 1);
          this.flag = (res.data.extras.operation == 1);
          this.appointmentTable.lists = res.data.content;
          this.formatData(this.appointmentTable.lists, res.data.extras.operation);
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
      this.router.navigate(['/mac-database/appointment', this.paramsMenu, 'detail', data.value.id]);
    }
    if (data.key === 'name' && data.value && data.value.documentNumber) {
      this.subscribeDialog = this.healthService.getBasicInfo(data.value.documentNumber)
        .subscribe(res => {
          if (res.code == 0 && res.data && res.data.isExist !== false) {
            this.router.navigate(['health-file', data.value.documentNumber]);
          } else {
            HintDialog('该用户无健康档案信息！', this.dialog);
          }
        });
    }
    if (data.key === 'name' && data.value && !data.value.documentNumber) {
      HintDialog('该用户无健康档案信息！', this.dialog);
    }
  }

  auditValid(): boolean {
    let flag = true;
    if (this.appointmentTable.lists) {
      this.appointmentTable.lists.forEach(obj => {
        if (obj.tablechecked) {
          flag = false;
        }
      });
    }
    return flag;
  }

  passAll(list) {
    // console.log(list);
    const checklist = [];
    list.forEach(data => {
      if (data.tablechecked) {
        checklist.push(data.id);
      }
    });
    // console.log(checklist);
    this.subscribeAudit = this.appointmentService.batchAudit(checklist)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('批量审核通过成功！', this.dialog);
          this.getData(0);
        } else {
          HintDialog('批量审核通过失败，请重新尝试！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  formatData(data, operation) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        if (obj.status == 0) {
          obj.statusName = '待审核';
        }
        if (obj.status == 1) {
          obj.statusName = '审核通过';
        }
        if (obj.status == 2) {
          obj.statusName = '审核未通过';
        }
        obj.edit = (obj.status == 0 && operation == 1) ? '审核' : '查看';
      });
    }
  }

  getCommunityAll() {
    this.subscribeCommunity = this.appointmentService.getCommunityAll()
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

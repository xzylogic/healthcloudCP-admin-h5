import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-receive-interview',
  templateUrl: './receive-interview.component.html'
})
export class ReceiveInterviewComponent implements OnInit, OnDestroy {
  paramsMenu: string;

  subscribeRoute: any;
  subscribeList: any;
  subscribeDialog: any;
  subscribeCommunity: any;

  containerConfig: ContainerConfig;
  interviewTable: TableOption;

  @select(['receive-interview', 'data']) data: Observable<any>;
  name = '';
  telephone = '';
  card = '';
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
    name: '待随访'
  }, {
    id: 2,
    name: '已随访'
  }];

  constructor(
    @Inject('action') private action,
    @Inject('interview') private interviewService,
    @Inject('health') private healthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewConfig();
    this.interviewTable = new TableOption({
      titles: this.interviewService.getTitles(),
      ifPage: true
    });
    // this.getCommunityAll();
    this.subscribeRoute = Observable.zip(
      this.route.params, this.data, this.getCommunityAll(),
      (param, data, community) => ({param, data, community})
    ).subscribe(res => {
      if (res.param && res.param.menu) {
        this.paramsMenu = res.param.menu;
      }
      if (res.data) {
        this.name = res.data.name;
        this.telephone = res.data.telephone;
        this.card = res.data.card;
        this.status = res.data.status;
        this.centerId = res.data.centerId;
        this.siteId = res.data.siteId;
        this.getData(res.data.page);
        this.getSiteFromCenter(this.centerId, this.siteId);
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
    // if (this.subscribeCommunity) {
    //   this.subscribeCommunity.unsubscribe();
    // }
  }

  reset() {
    this.name = '';
    this.telephone = '';
    this.card = '';
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
    this.interviewTable.reset(page);
    this.subscribeList = this.interviewService.getDataList(
      page, this.interviewTable.size,
      this.name, this.telephone,
      this.card, this.status,
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.interviewTable.loading = false;
        if (res.data && res.data.length == 0) {
          this.interviewTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          this.interviewTable.totalPage = res.totalPages;
          this.formatData(res.data);
          this.interviewTable.lists = res.data;
        } else {
          this.interviewTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.interviewTable.loading = false;
        this.interviewTable.errorMessage = ERRMSG.netErrMsg;
        console.log(err);
      });
  }

  formatData(data) {
    if (data && Array.isArray(data)) {
      data.forEach(obj => {
        obj.statusName = obj.followStatus == 1 ? '已随访' : '待随访';
        obj.edit = obj.followStatus == 1 ? '查看' : '登记';
      });
    }
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.action.dataChange('receive-interview', {
        name: this.name,
        telephone: this.telephone,
        card: this.card,
        status: this.status,
        centerId: this.centerId,
        siteId: this.siteId,
        page: this.interviewTable.currentPage
      });
      this.router.navigate(['/receive-interview', this.paramsMenu, 'detail', data.value.personcard]);
    }
    if (data.key === 'userName' && data.value && data.value.personcard) {
      this.subscribeDialog = this.healthService.getBasicInfo(data.value.personcard)
        .subscribe(res => {
          if (res.code == 0 && res.data && res.data.isExist === true) {
            this.action.dataChange('receive-interview', {
              name: this.name,
              telephone: this.telephone,
              card: this.card,
              status: this.status,
              centerId: this.centerId,
              siteId: this.siteId,
              page: this.interviewTable.currentPage
            });
            this.router.navigate(['health-file', data.value.personcard]);
          } else {
            HintDialog('该用户无健康档案信息！', this.dialog);
          }
        });
    }
    if (data.key === 'userName' && data.value && !data.value.personcard) {
      HintDialog('该用户无健康档案信息！', this.dialog);
    }
  }

  getCommunityAll() {
    return this.interviewService.getCommunityAll()
      .map(res => {
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

  getSiteFromCenter(centerId, siteId) {
    if (centerId && !siteId && this.communityList) {
      this.siteId = '';
      const site = [{menuId: '', name: '无'}];
      this.communityList.forEach(obj => {
        if (obj.parentId === centerId && obj.type == 2) {
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

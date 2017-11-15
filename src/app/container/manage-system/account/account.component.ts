import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;

  containerConfig: ContainerConfig;
  accountTable: TableOption;

  username = '';
  telephone = '';
  centerId = '';
  siteId = '';

  centerList: Array<any>;
  siteList: Array<any>;
  departmentList: Array<any>;
  communityList: Array<any>;

  constructor(
    @Inject('auth') private auth,
    @Inject('account') private accountService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
        this.accountTable = new TableOption({
          titles: this.accountService.setAccountTitles(this.permission),
          ifPage: true
        });
      }
    });
    this.containerConfig = this.accountService.setAccountConfig();
    this.getCommunityAll();
    this.getAccounts(0);
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
  }

  search() {
    this.getAccounts(0);
  }

  reset() {
    this.username = '';
    this.telephone = '';
    this.centerId = '';
    this.siteId = '';
    this.getCenter(this.communityList);
    this.getSite(this.communityList);
    this.getDepartment(this.communityList);
    this.getAccounts(0);
  }

  getAccounts(page: number) {
    this.accountTable.reset(page);
    this.subscribeData = this.accountService.getAccounts(
      page, this.accountTable.size,
      this.username, this.telephone,
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.accountTable.loading = false;
        if (res.code === 0 && res.data && res.data.data) {
          this.accountTable.totalPage = res.data.totalPages;
          this.formatData(res.data.data);
          this.accountTable.lists = res.data.data;
        } else {
          this.accountTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.accountTable.loading = false;
        console.log(err);
        this.accountTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    if (res.key === 'edit' && res.value.userId) {
      this.router.navigate(['/account', this.paramsMenu, 'edit'], {queryParams: {id: res.value.userId}});
    }
  }

  newData() {
    this.router.navigate(['/account', this.paramsMenu, 'edit']);
  }

  formatData(data) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        obj.roleName = obj.roleList[0] && obj.roleList[0].name || '';
      });
    }
  }

  getCommunityAll() {
    this.accountService.getCommunityAll()
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

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
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
    @Inject('account') private accountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.accountService.setAccountConfig();
    this.accountTable = new TableOption({
      titles: this.accountService.setAccountTitles(),
      ifPage: true
    });
    this.getCommunityAll();
    this.getAccounts(0);
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
    this.accountService.getAccounts(page, this.accountTable.size, this.username, this.telephone, this.siteId || this.centerId)
      .subscribe(res => {
        this.accountTable.loading = false;
        if (res.code === 0 && res.data && res.data.data && res.data.data.length === 0) {
          this.accountTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.data) {
          this.accountTable.totalPage = res.data.totalPages;
          this.accountTable.lists = res.data.data;
          this.formatData(this.accountTable.lists);
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
      this.router.navigate(['/account/edit'], {queryParams: {id: res.value.userId}});
    }
  }

  newData() {
    this.router.navigate(['/account/edit']);
  }

  formatData(data) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        obj.roleName = obj.roleList[0] && obj.roleList[0].name || '';
        obj.status = obj.delFlag == 1 ? '禁用' : '启用';
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

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeHDialog: any;
  subscribeDel: any;

  containerConfig: ContainerConfig;
  bannerTable: TableOption;

  status = '';
  queryTime = '';

  statusList = [{
    id: '0',
    name: '显示'
  }, {
    id: '1',
    name: '不显示'
  }];

  constructor(
    @Inject('auth') private auth,
    @Inject('banner') private bannerService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
        this.bannerTable = new TableOption({
          titles: this.bannerService.setBannerTable(this.permission),
          ifPage: true
        });
      }
    });
    this.containerConfig = this.bannerService.setBannerConfig();
    this.reset();
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    if (this.subscribeHDialog) {
      this.subscribeHDialog.unsubscribe();
    }
    if (this.subscribeDel) {
      this.subscribeDel.unsubscribe();
    }
  }

  reset() {
    this.status = '';
    this.queryTime = '';
    this.getBanners(0);
  }

  getBanners(page) {
    this.bannerTable.reset(page);
    this.subscribeData = this.bannerService.getBanners(
      page, this.bannerTable.size, this.status,
      this.queryTime.split(' 至 ')[0] || '',
      this.queryTime.split(' 至 ')[1] || '')
      .subscribe(res => {
        this.bannerTable.loading = false;
        if (res.data || res.totalPages == 0) {
          this.bannerTable.totalPage = res.totalPages;
          this.bannerTable.lists = res.data || [];
        } else {
          this.bannerTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.bannerTable.loading = false;
        this.bannerTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.router.navigate(['/banner', this.paramsMenu, 'edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'delFlag') {
      this.subscribeHDialog = HintDialog(
        `确定要更改${data.value.mainTitle}的状态为：${data.value.statusName == 0 ? '显示' : '不显示'}吗?`,
        this.dialog
      ).afterClosed().subscribe(res => {
        if (res && res.key == 'confirm') {
          this.getValues(data.value);
        }
      });
    }
  }

  newData() {
    this.router.navigate(['/banner', this.paramsMenu, 'edit']);
  }

  getValues(data) {
    const formData: any = Object.assign(data);
    formData.delFlag = data.delFlag == 0 ? 1 : 0;
    this.subscribeDel = this.bannerService.saveBanner(formData)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}

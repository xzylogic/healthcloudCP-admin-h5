import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
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
    @Inject('banner') private bannerService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.bannerService.setBannerConfig();
    this.bannerTable = new TableOption({
      titles: this.bannerService.setBannerTable(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.status = '';
    this.queryTime = '';
    this.getBanners(0);
  }

  getBanners(page) {
    this.bannerTable.reset(page);
    this.bannerService.getBanners(
      page, this.bannerTable.size, this.status,
      this.queryTime.split(' 至 ')[0] || '',
      this.queryTime.split(' 至 ')[1] || '')
      .subscribe(res => {
        this.bannerTable.loading = false;
        if (!res.data) {
          this.bannerTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          this.bannerTable.totalPage = res.totalPages;
          this.formatData(res.data);
          this.bannerTable.lists = res.data;
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
      this.router.navigate(['/banner/edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'statusName') {
      HintDialog(`确定要更改${data.value.mainTitle}的状态为：${data.value.statusName}吗?`, this.dialog)
        .afterClosed().subscribe(res => {
        if (res && res.key == 'confirm') {
          this.getValues(data.value);
        }
      });
    }
  }

  newData() {
    this.router.navigate(['/banner/edit']);
  }

  formatData(list) {
    if (Array.isArray(list)) {
      list.forEach(obj => {
        obj.status = obj.delFlag == 0 ? '显示' : '不显示';
        obj.statusName = obj.delFlag == 0 ? '不显示' : '显示';
      });
    }
  }

  getValues(data) {
    const formData: any = Object.assign(data);
    formData.delFlag = data.delFlag == 0 ? 1 : 0;
    this.bannerService.saveBanner(formData)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.reset();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}

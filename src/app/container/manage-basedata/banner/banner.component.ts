import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  containerConfig: ContainerConfig;
  bannerTable: TableOption;
  adcode = '';
  startTime = '';
  endTime = '';

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
    this.adcode = '';
    this.startTime = '';
    this.endTime = '';
    this.getBanners(0);
  }

  getBanners(page) {
    this.bannerTable.reset(page);
    this.bannerService.getBanners(page, this.bannerTable.size, this.adcode, this.startTime, this.endTime)
      .subscribe(res => {
        this.bannerTable.loading = false;
        if (res.data && res.data.length === 0) {
          this.bannerTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          this.bannerTable.totalPage = res.totalPages;
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
    console.log(data);
    if (data.key === 'edit') {
      this.router.navigate(['/banner/edit'], {queryParams: {id: data.value.id}});
    }
  }

  newData() {
    this.router.navigate(['/banner/edit']);
  }
}

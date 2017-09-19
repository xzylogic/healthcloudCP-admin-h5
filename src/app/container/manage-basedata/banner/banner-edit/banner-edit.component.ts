import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html'
})
export class BannerEditComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('banner') private bannerService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.bannerService.setBannerEditConfig(false);
  }
}

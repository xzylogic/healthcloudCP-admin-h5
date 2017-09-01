import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('banner') private bannerService) {
  }

  ngOnInit() {
    this.containerConfig = this.bannerService.setBannerConfig();
  }
}

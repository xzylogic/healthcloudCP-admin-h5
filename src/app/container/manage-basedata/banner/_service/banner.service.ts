import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class BannerService {
  constructor() {
  }

  setBannerConfig() {
    return new ContainerConfig({
      title: '广告管理',
      subTitle: 'banner设置',
      ifHome: true,
      homeRouter: '/banner'
    });
  }
}

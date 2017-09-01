import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class MenuService {
  constructor() {
  }

  setMenuConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '菜单管理',
      ifHome: true,
      homeRouter: '/menu',
    });
  }
}

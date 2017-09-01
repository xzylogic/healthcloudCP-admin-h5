import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class OrganizationService {
  constructor() {
  }

  setOrganizationConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '医院机构管理',
      ifHome: true,
      homeRouter: '/organization'
    });
  }
}

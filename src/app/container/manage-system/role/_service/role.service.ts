import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class RoleService {
  constructor() {
  }

  setRoleConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '角色管理',
      ifHome: true,
      homeRouter: '/role'
    });
  }
}

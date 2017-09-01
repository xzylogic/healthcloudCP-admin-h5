import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class AccountService {
  constructor() {
  }

  setAccountConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '账号管理',
      ifHome: true,
      homeRouter: '/account'
    });
  }
}

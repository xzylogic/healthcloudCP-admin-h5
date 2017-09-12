import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class MessageService {
  constructor(
    @Inject('app') private app
  ) {
  }

  setMessageConfig() {
    return new ContainerConfig({
      title: '消息',
      subTitle: '消息列表',
      ifHome: true,
      homeRouter: '/message'
    });
  }
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getMessage: '/api/message/list',
  delMessage: '/api/message/delete',
  readMessage: '/api/message/updateReadStatus'
};

@Injectable()
export class MessageService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
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

  getMessage(page) {
    return this.http.get(`${this.app.api_url}${PATH.getMessage}?flag=${page + 1}&uid=${this.auth.getAdminId()}`);
  }

  delMessage(ids) {
    return this.http.post(`${this.app.api_url}${PATH.delMessage}`, ids);
  }

  readMessage(ids) {
    return this.http.get(`${this.app.api_url}${PATH.readMessage}?ids=${ids}`);
  }
}

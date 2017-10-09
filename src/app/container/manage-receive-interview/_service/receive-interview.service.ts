import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Injectable()
export class ReceiveInterviewService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  setReceiveInterviewConfig() {
    return new ContainerConfig({
      title: '叶酸随访管理',
      subTitle: '叶酸随访信息',
      ifHome: true,
      homeRouter: '/pregnancy-interview'
    });
  }

  setReceiveInterviewDetailConfig() {
    return new ContainerConfig({
      title: '叶酸随访管理',
      subTitle: '叶酸随访详情',
      ifHome: false,
      homeRouter: '/pregnancy-interview'
    });
  }

}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Injectable()
export class PregnancyInterviewService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  setPregnancyInterviewConfig() {
    return new ContainerConfig({
      title: '孕期随访管理',
      subTitle: '孕期随访信息',
      ifHome: true,
      homeRouter: '/pregnancy-interview'
    });
  }

  setPregnancyInterviewDetailConfig() {
    return new ContainerConfig({
      title: '孕期随访管理',
      subTitle: '孕期随访详情',
      ifHome: false,
      homeRouter: '/pregnancy-interview'
    });
  }

}

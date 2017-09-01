import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class PlanService {
  constructor() {
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '儿童体检预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/pe-for-children/plan'
    });
  }
}

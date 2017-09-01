import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class PlanService {
  constructor() {
  }

  setPlanConfig() {
    return new ContainerConfig({
      title: '计划免疫预约',
      subTitle: '排号及号源维护',
      ifHome: true,
      homeRouter: '/planned-immunity/plan'
    });
  }
}

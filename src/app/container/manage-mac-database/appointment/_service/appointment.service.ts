import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class AppointmentService {
  constructor() {
  }

  setAppointmentConfig() {
    return new ContainerConfig({
      title: '母子建档预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/mac-database/appointment'
    });
  }
}

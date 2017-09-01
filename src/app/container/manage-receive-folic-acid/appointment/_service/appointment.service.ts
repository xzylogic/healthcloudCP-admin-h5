import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class AppointmentService {
  constructor() {
  }

  setAppointmentConfig() {
    return new ContainerConfig({
      title: '叶酸领取预约',
      subTitle: '预约信息查询',
      ifHome: true,
      homeRouter: '/receive-folic-acid/appointment'
    });
  }
}

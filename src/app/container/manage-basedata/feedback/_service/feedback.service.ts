import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class FeedbackService {
  constructor() {
  }

  setFeedbackConfig() {
    return new ContainerConfig({
      title: '建议反馈',
      subTitle: '建议反馈列表',
      ifHome: true,
      homeRouter: '/feedback'
    });
  }
}

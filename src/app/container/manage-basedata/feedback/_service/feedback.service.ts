import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getFeedbacks: '/api/advice/list',
  getFeedback: '/api/advice/info',
};

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getFeedbacks(page, size, tel?, start?, end?) {
    return this.http.post(`${this.app.api_url}${PATH.getFeedbacks}`, {
      number: page + 1,
      size: size,
      parameter: {
        startTime: start || '',
        endTime: end || '',
        telephone: tel || ''
      }
    });
  }

  getFeedback(id) {
    return this.http.get(`${this.app.api_url}${PATH.getFeedback}?id=${id}`);
  }

  setFeedbackConfig() {
    return new ContainerConfig({
      title: '建议反馈',
      subTitle: '建议反馈列表',
      ifHome: true,
      homeRouter: '/feedback'
    });
  }

  setFeedbackDetailConfig() {
    return new ContainerConfig({
      title: '建议反馈',
      subTitle: '建议反馈详情',
      ifHome: false,
      homeRouter: '/feedback'
    });
  }

  setFeedbackTable() {
    return [
      new TableTitle({
        key: 'telephone',
        name: '联系电话'
      }),
      new TableTitle({
        key: 'email',
        name: '电子邮箱'
      }),
      new TableTitle({
        key: 'createTime',
        name: '提交时间',
        controlType: ControlType.date
      }),
      new TableTitle({
        key: 'adviceContent',
        name: '建议',
        maxwidth: 300,
        controlType: ControlType.maxtext
      }),
      new TableTitle({
        key: '',
        name: '操作',
        controlType: ControlType.buttons,
        option: [{
          key: 'detail',
          name: '查看'
        }]
      }),
    ]
      ;
  }
}

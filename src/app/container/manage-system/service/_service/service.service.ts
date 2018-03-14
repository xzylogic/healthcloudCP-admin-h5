import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDate } from '../../../../libs/dform/_entity/form-date';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {};

@Injectable()
export class ServiceService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setServiceConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '服务管理',
      ifHome: true,
      homeRouter: '/service'
    });
  }

  // setAccountForm(data?): FormBase<any>[] {
  //   const forms: FormBase<any>[] = [];
  //   forms.push(
  //     new FormText({
  //       key: 'username',
  //       label: '版本号',
  //       value: data && data.username || '',
  //       pattern: '^[A-Za-z0-9.]+$',
  //       required: true,
  //       errMsg: '请填写版本号',
  //       order: 0
  //     })
  //   );
  //   forms.push(
  //     new FormText({
  //       key: 'loginname',
  //       label: '应用图标',
  //       value: data && data.loginname || '',
  //       required: true,
  //       errMsg: '请选择应用图标',
  //       order: 1
  //     })
  //   );
  //   forms.push(
  //     new FormDate({
  //       key: 'telephone',
  //       label: '发布时间',
  //       value: data && data.telephone || '',
  //       required: true,
  //       errMsg: '请选择发布时间',
  //       order: 2
  //     })
  //   );
  //   forms.push(
  //     new FormTextarea({
  //       key: 'roleId',
  //       label: '发布内容',
  //       value: data && data.roleId || '',
  //       maxlength: 300,
  //       required: true,
  //       errMsg: '请填写发布内容',
  //       order: 4
  //     })
  //   );
  //   return forms.sort((a, b) => a.order - b.order);
  // }
}

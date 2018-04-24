import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

const PATH = {
  saveShare: '/api/appConfig/saveAppConfig'
};

@Injectable()
export class ShareService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setShareConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '分享链接配置',
      ifHome: true,
      homeRouter: '/share'
    });
  }

  setShareEditConfig(flag) {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: flag ? '编辑版本信息' : '新增版本信息',
      ifHome: false,
      homeRouter: '/share',
      back: true
    });
  }

  saveShare(data) {
    this.http.setHeaders({
      'main-area': 3101,
      source: 1
    });
    return this.http.post(`${this.app.api_url}${PATH.saveShare}`, data);
  }

  setShareForm(data?, disable?: boolean): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'title',
        label: '标题',
        value: data && data.title || '',
        disabled: !!disable,
        required: true,
        errMsg: '请填写分享标题',
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'desc',
        label: '描述',
        value: data && data.desc || '',
        disabled: !!disable,
        required: true,
        errMsg: '请填写分享描述',
        order: 2
      })
    );
    forms.push(
      new FormFile({
        key: 'thumb',
        label: '缩略图',
        value: data && data.thumb || '',
        disabled: !!disable,
        required: true,
        errMsg: '请选择缩略图',
        order: 3
      })
    );
    forms.push(
      new FormText({
        key: 'androidUrl',
        label: 'Android下载地址',
        value: data && data.androidUrl || '',
        disabled: !!disable,
        required: true,
        errMsg: '请填写Android下载地址',
        order: 4
      })
    );
    forms.push(
      new FormText({
        key: 'iosUrl',
        label: 'iOS下载地址',
        value: data && data.iosUrl || '',
        disabled: !!disable,
        required: true,
        errMsg: '请填写iOS下载地址',
        order: 5
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

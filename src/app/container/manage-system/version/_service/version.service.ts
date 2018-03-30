import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

const PATH = {
  saveVersion: '/api/version/save'
};

@Injectable()
export class VersionService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setVersionConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '版本信息管理',
      ifHome: true,
      homeRouter: '/version'
    });
  }

  setVersionEditConfig(flag) {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: flag ? '编辑版本信息' : '新增版本信息',
      ifHome: false,
      homeRouter: '/version',
      back: true
    });
  }

  saveVersion(data, type) {
    const saveData = data;
    saveData.productType = type;
    return this.http.post(`${this.app.api_url}${PATH.saveVersion}`, saveData);
  }

  setVersionForm(data?, disable?: boolean): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormDropdown({
        key: 'productCategory',
        label: '终端分类',
        value: '1',
        options: [{
          id: '1',
          name: '用户端'
        }],
        readonly: true,
        disabled: !!disable,
        required: true,
        order: 0
      })
    );
    forms.push(
      new FormText({
        key: 'versionNum',
        label: '版本号',
        value: data && data.versionNum || '',
        pattern: '^[A-Za-z0-9.]+$',
        maxlength: 10,
        disabled: !!disable,
        required: true,
        errMsg: '请填写正确的版本号（只允许输入字母、数字和小数点）',
        order: 1
      })
    );
    forms.push(
      new FormFile({
        key: 'appIcon',
        label: '应用图标',
        value: data && data.appIcon || '',
        disabled: !!disable,
        required: true,
        errMsg: '请选择应用图标',
        order: 2
      })
    );
    forms.push(
      new FormTextarea({
        key: 'publishContent',
        label: '发布内容',
        value: data && data.publishContent || '',
        maxlength: 500,
        size: '10',
        disabled: !!disable,
        required: true,
        errMsg: '请填写发布内容',
        order: 3
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

const PATH = {
  getUpdate: '/api/appConfig/findSingleAppConfigByKeyWord',
  saveUpdate: '/api/appConfig/saveAppConfig'
};

@Injectable()
export class UpdateService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setUpdateConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '版本升级管理',
      ifHome: true,
      homeRouter: '/update'
    });
  }

  getUpdate(type) {
    this.http.setHeaders({
      'main-area': 3101,
      source: 1
    });
    return this.http.get(`${this.app.api_url}${PATH.getUpdate}?keyWord=${type}`);
  }

  saveUpdate(data) {
    this.http.setHeaders({
      'main-area': 3101,
      source: 1
    });
    return this.http.post(`${this.app.api_url}${PATH.saveUpdate}`, data);
  }

}

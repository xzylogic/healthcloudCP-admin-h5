import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';

const PATH = {
  accountList: '/api/basicInfo/user/list',
  accountDetail: '/api/basicInfo/userEditor',
  accountValid: '/api/basicInfo/user/nameExist'
};

@Injectable()
export class AccountService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setAccountConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '账号管理',
      ifHome: true,
      homeRouter: '/account'
    });
  }

  setAccountEditConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '账号信息',
      ifHome: false,
      homeRouter: '/account'
    });
  }

  getAccounts(page) {
    // return this.http.get('json/account.json');
    return this.http.post(`${this.app.api_url}${PATH.accountList}`, {
      number: page,
      parameter: {}
    });
  }

  getAccount(id) {
    return this.http.get('json/account-detail.json');
    // return this.http.get(`${this.app.api_url}${PATH.accountDetail}?userId=${id}`);
  }

  getValid(name) {
    return this.http.get(`${this.app.api_url}${PATH.accountValid}?loginname=${name}&userId=${this.auth.getAdminId()}`);
  }

  setAccountTitles() {
    return [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '姓名',
        key: 'username'
      }),
      new TableTitle({
        name: '后台账号',
        key: 'loginname'
      }),
      new TableTitle({
        name: '手机号码',
        key: 'telephone'
      }),
      new TableTitle({
        name: '所属机构',
        key: 'communityName'
      }),
      new TableTitle({
        name: '角色',
        key: 'roleName'
      }),
      new TableTitle({
        name: '操作',
        key: '',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: '编辑'
        }]
      }),
    ];
  }

  setAccountForm(): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'username',
        label: '姓名',
        value: '',
        required: true,
        errMsg: '请填写姓名'
      })
    );
    forms.push(
      new FormText({
        key: 'loginname',
        label: '后台账号',
        value: '',
        required: true,
        errMsg: '请填写用户后台账号'
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '手机号码',
        value: '',
        required: true,
        errMsg: '请填写用户手机号码'
      })
    );
    forms.push(
      new FormText({
        key: 'menuId',
        label: '所属机构',
        value: '',
        errMsg: '请选择用户所属机构'
      })
    );
    forms.push(
      new FormText({
        key: 'roleIds',
        label: '角色',
        value: '',
        errMsg: '请选择账号角色'
      })
    );
    forms.push(
      new FormText({
        key: 'delFlag',
        label: '是否启用',
        value: '',
        required: true
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

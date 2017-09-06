import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';

const PATH = {
  accountList: '/api/basicInfo/user/list',
  accountDetail: '/api/basicInfo/userEditor'
};

@Injectable()
export class AccountService {
  constructor(
    @Inject('app') private app,
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

  getAccounts(data) {
    return this.http.get('json/account.json');
    // return this.http.post(`${this.app.api_url}${PATH.accountList}`, data);
  }

  getAccount(id) {
    return this.http.get('json/account-detail.json');
    // return this.http.get(`${this.app.api_url}${PATH.accountDetail}?userId=${id}`);
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
        key: 'name'
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
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'loginname',
        label: '后台账号',
        value: '',
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '手机号码',
        value: '',
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'menuId',
        label: '所属机构',
        value: ''
      })
    );
    forms.push(
      new FormText({
        key: 'roleIds',
        label: '角色',
        value: ''
      })
    );
    forms.push(
      new FormText({
        key: 'delFlag',
        label: '是否启用',
        value: ''
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

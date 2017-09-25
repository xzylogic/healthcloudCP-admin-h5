import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';

const PATH = {
  accountList: '/api/basicInfo/user/list',
  accountDetail: '/api/basicInfo/userEditor',
  accountValid: '/api/basicInfo/user/nameExist',
  getRole: '/api/basicInfo/role/list',
  getCenter: '/api/getAllCommunityCenterByUserId',
  getSite: '/api/getAllCommunityCenterByUserId',
  updateAccount: '/api/basicInfo/user/update',
  getCommunity: '/api/getCommunityMenuByUserId',
  getCommunityAll: '/api/getAllCommunityByUserId',
  resetPwd: '/api/basicInfo/user/updatePassword'
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

  setAccountEditConfig(flag) {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: flag ? '编辑账号' : '新增账号',
      ifHome: false,
      homeRouter: '/account'
    });
  }

  getAccounts(page, size, username, telephone, menuId) {
    return this.http.post(`${this.app.api_url}${PATH.accountList}`, {
      number: page + 1,
      parameter: {
        username: username || '',
        telephone: telephone || '',
        menuId: menuId || '',
      },
      size: size
    });
  }

  getAccount(id) {
    return this.http.get(`${this.app.api_url}${PATH.accountDetail}?userId=${id}`);
  }

  updateAccount(data, roleIds, menuId) {
    return this.http.post(`${this.app.api_url}${PATH.updateAccount}?roleIds=${roleIds}&menuId=${menuId}`, data);
  }

  getValid(name, userId) {
    let query = `loginname=${name}`;
    if (userId) {
      query += `&userId=${userId}`;
    }
    return this.http.get(`${this.app.api_url}${PATH.accountValid}?${query}`);
  }

  getRole() {
    return this.http.post(`${this.app.api_url}${PATH.getRole}`, {
      delFlag: 0
    });
  }

  getCommunity() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunity}?userId=${this.auth.getAdminId()}`);
  }

  getCommunityAll() {
    return this.http.get(`${this.app.api_url}${PATH.getCommunityAll}?userId=${this.auth.getAdminId()}`);
  }

  resetPwd(id) {
    return this.http.post(`${this.app.api_url}${PATH.resetPwd}`, {userId: id, password: 123456});
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
        name: '状态',
        key: 'status'
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

  setAccountForm(data?): FormBase<any>[] {
    // console.log(data && data.roleId);
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'username',
        label: '姓名',
        value: data && data.username || '',
        required: true,
        errMsg: '请填写姓名'
      })
    );
    forms.push(
      new FormText({
        key: 'loginname',
        label: '后台账号',
        value: data && data.loginname || '',
        pattern: '^[a-z0-9]+$',
        required: true,
        errMsg: '请填写用户后台账号（小写英文字母或数字组成）'
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '手机号码',
        value: data && data.telephone || '',
        required: true,
        pattern: '1[0-9]{10}',
        errMsg: '请填写正确的11位手机号码'
      })
    );
    forms.push(
      new FormText({
        key: 'menuId',
        label: '所属机构',
        value: data && data.menuId || '',
        required: true,
        errMsg: '请选择用户所属机构'
      })
    );
    forms.push(
      new FormText({
        key: 'roleId',
        label: '角色',
        value: data && data.roleId || '',
        required: true,
        errMsg: '请选择账号角色'
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || '',
        required: true,
        options: [{
          id: '0',
          name: '启用'
        }, {
          id: '1',
          name: '禁用'
        }]
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

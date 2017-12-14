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
  getCommunityAll: '/api/appointmentTime/getAllCommunityByUserId',
  // getCommunityAll: '/api/getAllCommunityByUserId',
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
      homeRouter: '/account',
      back: true
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

  updateAccount(data, roleIds, menuId, menu) {
    return this.http.post(`${this.app.api_url}${PATH.updateAccount}?roleIds=${roleIds}&menuId=${menuId}&jmenuId=${menu}`, data);
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

  resetPwd(id, menu) {
    return this.http.post(`${this.app.api_url}${PATH.resetPwd}?menuId=${menu}`, {userId: id, password: 123456});
  }

  setAccountTitles(flag) {
    const Titles = [
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
        key: 'delFlag',
        controlType: ControlType.pipe,
        option: {
          key: [1, 0],
          value: ['禁用', '启用']
        }
      })
    ];
    if (flag) {
      Titles.push(
        new TableTitle({
          name: '操作',
          key: '',
          controlType: ControlType.buttons,
          option: [{
            key: 'edit',
            name: '编辑'
          }]
        }));
    }
    return Titles;
  }

  setAccountForm(data?): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'username',
        label: '姓名',
        value: data && data.username || '',
        required: true,
        errMsg: '请填写姓名',
        order: 0
      })
    );
    forms.push(
      new FormText({
        key: 'loginname',
        label: '后台账号',
        value: data && data.loginname || '',
        pattern: '^[a-z0-9]+$',
        required: true,
        errMsg: '请填写用户后台账号（小写英文字母或数字组成）',
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '手机号码',
        value: data && data.telephone || '',
        required: true,
        pattern: '1[0-9]{10}',
        errMsg: '请填写正确的11位手机号码',
        order: 2
      })
    );
    forms.push(
      new FormText({
        key: 'personCard',
        label: '身份证号',
        value: data && data.personCard || '',
        required: true,
        pattern: `(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)`,
        errMsg: '请填写正确的身份证号',
        order: 10
      })
    );
    forms.push(
      new FormText({
        key: 'menuId',
        label: '所属机构',
        value: data && data.menuId || '',
        required: true,
        errMsg: '请选择用户所属机构',
        order: 3
      })
    );
    forms.push(
      new FormText({
        key: 'roleId',
        label: '角色',
        value: data && data.roleId || '',
        required: true,
        errMsg: '请选择账号角色',
        order: 4
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
        }],
        order: 5
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

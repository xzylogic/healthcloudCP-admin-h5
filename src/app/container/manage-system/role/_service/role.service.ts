import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormTree } from '../../../../libs/dform/_entity/form-tree';

const PATH = {
  getRoles: '/api/basicInfo/role/list',
  getRole: '/api/basicInfo/roleAdd',
  updateRole: '/api/basicInfo/role/saveOrUpdate',
  enableRole: '/api/basicInfo/role/enOrDisable',
  getMenu: '/api/menu/list'
};

@Injectable()
export class RoleService {
  constructor(
    @Inject('http') private http,
    @Inject('app') private app
  ) {
  }

  getRoles(name) {
    return this.http.post(`${this.app.api_url}${PATH.getRoles}`, {name: name});
  }

  getRole(roleId) {
    return this.http.get(`${this.app.api_url}${PATH.getRole}?roleId=${roleId}`);
  }

  getMenu() {
    return this.http.get(`${this.app.api_url}${PATH.getMenu}`);
  }

  updateRole(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateRole}`, data);
  }

  enableRole(ids, flag) {
    return this.http.get(`${this.app.api_url}${PATH.enableRole}?roleIds=${ids}&delFlag=${flag}`);
  }

  setRoleConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '角色管理',
      ifHome: true,
      homeRouter: '/role'
    });
  }

  setRoleEditConfig(flag) {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: flag ? '编辑角色' : '新增角色',
      ifHome: false,
      homeRouter: '/role'
    });
  }

  setRoleTitles() {
    return [
      new TableTitle({
        name: 'NO.',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '角色名称',
        key: 'name'
      }),
      new TableTitle({
        name: '是否启用',
        key: 'enable'
      }),
      new TableTitle({
        name: '更新时间',
        key: 'updateDate'
      }),
      new TableTitle({
        name: '操作',
        key: '',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: '编辑'
        }, {
          key: 'enableButton',
          name: ''
        }]
      }),
    ];
  }

  setRoleForm(tree, data?) {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'name',
        label: '角色名称',
        value: data || '',
        required: true,
        errMsg: '请填写角色名称'
      })
    );
    forms.push(
      new FormTree({
        key: 'menuIds',
        label: '菜单权限',
        value: [],
        required: true,
        options: tree || [],
        errMsg: '请选择菜单权限'
      })
    );
    return forms;
  }
}

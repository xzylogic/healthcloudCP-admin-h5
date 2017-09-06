import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';

const PATH = {
  getMenus: '/api/menu/list',
  updateMenu: '/api/menu/saveOrUpdate',
  deleteMenu: '/api/menu/delete'
};

@Injectable()
export class MenuService {
  constructor(
    @Inject('http') private http,
    @Inject('app') private app
  ) {
  }

  getMenus() {
    return this.http.get(`${this.app.api_url}${PATH.getMenus}`);
  }

  updateMenu(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateMenu}`, data);
  }

  deleteMenu(id) {
    return this.http.post(`${this.app.api_url}${PATH.deleteMenu}?menuIds=${id}`, {});
  }

  setMenuConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '菜单管理',
      ifHome: true,
      homeRouter: '/menu',
    });
  }

  setMenuFrom(req: { parent?: { parentId: string, parentName: string }, data?: any }): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    if (req && req.parent && req.parent.parentName && req.parent.parentId) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '父菜单',
          value: req.parent.parentName,
          disabled: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父菜单id',
          value: req.parent.parentId,
          required: true,
          order: 0
        })
      );
    }
    if (req && req.data && req.data.parentId && req.data.menuId) {
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父菜单id',
          value: req.data.parentId,
          required: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: '父菜单id',
          value: req.data.menuId,
          required: true,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '菜单名称',
        value: req && req.data && req.data.menuName || '',
        required: true,
        errMsg: '请填写菜单名称',
        order: 1
      })
    );

    if (req && (!req.data || (req.data && req.data.parentId))) {
      forms.push(
        new FormText({
          key: 'href',
          label: '路由',
          value: req && req.data && req.data.href || '',
          required: true,
          errMsg: '请填写路由地址',
          order: 2
        })
      );
    }

    forms.push(
      new FormText({
        key: 'sort',
        label: '排序',
        value: req && req.data && req.data.sort || '',
        type: 'number',
        required: true,
        errMsg: '请填写排序数字',
        order: 3
      })
    );
    forms.push(
      new FormHidden({
        key: 'delFlag',
        label: '',
        value: 0,
        required: true
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

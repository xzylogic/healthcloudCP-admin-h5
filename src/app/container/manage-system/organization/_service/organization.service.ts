import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';

const PATH = {
  getMenus: '/api/communityMenu/list',
  updateCenter: '/api/communityCenter/saveOrUpdate',
  updateSite: '/api/communitySite/saveOrUpdate',
  updateDepartment: '/api/communityDepartment/saveOrupdate',
  deleteMenu: '/api/menu/delete'
};

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('http') private http,
    @Inject('app') private app
  ) {
  }

  getMenus() {
    return this.http.get(`${this.app.api_url}${PATH.getMenus}`);
  }

  updateCenter(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateCenter}`, data);
  }

  updateSite(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateSite}`, data);
  }

  updateDepartment(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateDepartment}`, data);
  }

  setOrganizationConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '医院机构管理',
      ifHome: true,
      homeRouter: '/organization'
    });
  }

  setCenterForm(status, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        order: 0
      })
    );
    if (parentName && parentId) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '父级',
          value: parentName,
          disabled: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父id',
          value: parentId,
          required: true,
          order: 0
        })
      );
    }
    if (data && data.menuId && data.parentId) {
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父菜单id',
          value: data.parentId,
          required: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '中心名称',
        value: data && data.menuName || '',
        required: true,
        readonly: !!(data && data.menuName),
        errMsg: '请填写中心名称',
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '中心简拼',
        value: data && data.nameShort || '',
        required: true,
        errMsg: '请填写中心简拼',
        order: 2
      })
    );
    forms.push(
      new FormText({
        key: 'picture',
        label: '中心图片',
        value: data && data.picture || '',
        order: 3
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '中心电话',
        value: data && data.telephone || '',
        required: true,
        errMsg: '请填写中心电话',
        order: 4
      })
    );
    forms.push(
      new FormText({
        key: 'address',
        label: '中心地址',
        value: data && data.address || '',
        required: true,
        errMsg: '请填写中心地址',
        order: 5
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || '',
        options: [{
          id: '0',
          name: '是'
        }, {
          id: '1',
          name: '否'
        }],
        required: true,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }

  setSiteForm(status, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        order: 0
      })
    );
    if (parentName && parentId) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '所属中心',
          value: parentName,
          disabled: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父id',
          value: parentId,
          required: true,
          order: 0
        })
      );
    }
    if (data && data.menuId && data.parentId) {
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父菜单id',
          value: data.parentId,
          required: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '站点名称',
        value: data && data.menuName || '',
        required: true,
        readonly: !!(data && data.menuName),
        errMsg: '请填写站点名称',
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '站点简拼',
        value: data && data.nameShort || '',
        required: true,
        errMsg: '请填写站点简拼',
        order: 2
      })
    );
    forms.push(
      new FormText({
        key: 'picture',
        label: '站点图片',
        value: data && data.picture || '',
        order: 3
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '站点电话',
        value: data && data.telephone || '',
        required: true,
        errMsg: '请填写站点电话',
        order: 4
      })
    );
    forms.push(
      new FormText({
        key: 'address',
        label: '站点地址',
        value: data && data.address || '',
        required: true,
        errMsg: '请填写站点地址',
        order: 5
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || '',
        options: [{
          id: '0',
          name: '是'
        }, {
          id: '1',
          name: '否'
        }],
        required: true,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }

  setDepartmentForm(status, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        order: 0
      })
    );
    if (parentName && parentId) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '所属站点',
          value: parentName,
          disabled: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父id',
          value: parentId,
          required: true,
          order: 0
        })
      );
    }
    if (data && data.menuId && data.parentId) {
      forms.push(
        new FormHidden({
          key: 'parentId',
          label: '父菜单id',
          value: data.parentId,
          required: true,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '科室名称',
        value: data && data.menuName || '',
        required: true,
        readonly: !!(data && data.menuName),
        errMsg: '请填写科室名称',
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '科室简称',
        value: data && data.nameShort || '',
        required: true,
        errMsg: '请填写科室简称',
        order: 2
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '主管负责人',
        value: data && data.telephone || '',
        required: true,
        errMsg: '请填写主管负责人',
        order: 4
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || '',
        options: [{
          id: '0',
          name: '是'
        }, {
          id: '1',
          name: '否'
        }],
        required: true,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

const PATH = {
  getMenus: '/api/getCommunityMenuByUserId',
  getMenuAll: '/api/communityMenu/list',
  updateCenter: '/api/communityCenter/saveOrUpdate',
  updateSite: '/api/communitySite/saveOrUpdate',
  updateDepartment: '/api/communityDepartment/saveOrupdate',
  getCenter: '/api/getCommunityCenterById',
  getSite: '/api/getCommunitySiteById',
  getDepartment: '/api/getCommunityDepartmentById'
};

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('http') private http,
    @Inject('auth') private auth,
    @Inject('app') private app
  ) {
  }

  getMenus() {
    return this.http.get(`${this.app.api_url}${PATH.getMenus}?userId=${this.auth.getAdminId()}`);
  }

  getMenuAll() {
    return this.http.get(`${this.app.api_url}${PATH.getMenuAll}`);
  }

  updateCenter(data, menu) {
    return this.http.post(`${this.app.api_url}${PATH.updateCenter}?menuId=${menu}`, data);
  }

  updateSite(data, menu) {
    return this.http.post(`${this.app.api_url}${PATH.updateSite}?menuId=${menu}`, data);
  }

  updateDepartment(data, menu) {
    return this.http.post(`${this.app.api_url}${PATH.updateDepartment}?menuId=${menu}`, data);
  }

  getCenter(id) {
    return this.http.get(`${this.app.api_url}${PATH.getCenter}?menuId=${id}`);
  }

  getSite(id) {
    return this.http.get(`${this.app.api_url}${PATH.getSite}?menuId=${id}`);
  }

  getDepartment(id) {
    return this.http.get(`${this.app.api_url}${PATH.getDepartment}?menuId=${id}`);
  }

  setOrganizationConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '医院机构管理',
      ifHome: true,
      homeRouter: '/organization'
    });
  }

  setCenterForm(status, disable, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        disabled: !disable,
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
          disabled: !disable,
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
          disabled: !disable,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          disabled: !disable,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '中心名称',
        value: data && data.communityName || '',
        required: true,
        // readonly: !!(data && data.communityName),
        errMsg: '请填写中心名称',
        disabled: !disable,
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '中心简拼',
        value: data && data.nameForShort || '',
        required: true,
        errMsg: '请填写中心简拼（1～6位小写英文字母）',
        pattern: '^[a-z]{1,6}$',
        disabled: !disable,
        order: 2
      })
    );
    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '中心图片(请上传不大于20KB的JPG或者PNG图片)',
        value: data && data.imageUrl || '',
        disabled: !disable,
        order: 3,
        size: 20,
        url: ''
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '中心电话',
        value: data && data.telephone || '',
        required: true,
        errMsg: '请填写中心电话',
        disabled: !disable,
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
        disabled: !disable,
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
        disabled: !disable,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }

  setSiteForm(status, disable, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        disabled: !disable,
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
          disabled: !disable,
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
          disabled: !disable,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          disabled: !disable,
          order: 0
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '站点名称',
        value: data && data.siteName || '',
        required: true,
        // readonly: !!(data && data.siteName),
        errMsg: '请填写站点名称',
        disabled: !disable,
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '站点简拼',
        value: data && data.nameForShort || '',
        required: true,
        errMsg: '请填写站点简拼（1～6位小写英文字母）',
        pattern: '^[a-z]{1,6}$',
        disabled: !disable,
        order: 2
      })
    );
    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '站点图片(请上传不大于20KB的JPG或者PNG图片)',
        value: data && data.imageUrl || '',
        disabled: !disable,
        order: 3,
        size: 20,
        url: ''
      })
    );
    forms.push(
      new FormText({
        key: 'telephone',
        label: '站点电话',
        value: data && data.telephone || '',
        required: true,
        errMsg: '请填写站点电话',
        disabled: !disable,
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
        disabled: !disable,
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
        disabled: !disable,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }

  setDepartmentForm(status, disable, data?, parentName?, parentId?): FormBase<any>[] {
    const forms: FormBase<any> [] = [];
    forms.push(
      new FormHidden({
        key: 'status',
        label: '',
        value: status,
        disabled: !disable,
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
          disabled: !disable,
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
          disabled: !disable,
          order: 0
        })
      );
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: 'id',
          value: data.menuId,
          required: true,
          disabled: !disable,
          order: 0
        })
      );
    }
    forms.push(
      new FormDropdown({
        key: 'name',
        label: '科室名称',
        value: data && data.departmentName || '',
        required: true,
        options: [{
          id: '预防保健科',
          name: '预防保健科'
        }, {
          id: '孕期保健科',
          name: '孕期保健科'
        }, {
          id: '妇幼保健科',
          name: '妇幼保健科'
        }, {
          id: '儿童保健科',
          name: '儿童保健科'
        }],
        // readonly: !!(data && data.departmentName),
        errMsg: '请选择科室名称',
        disabled: !disable,
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'nameShort',
        label: '科室简称',
        value: data && data.nameForShort || '',
        required: true,
        errMsg: '请填写科室简称',
        disabled: !disable,
        order: 2
      })
    );
    forms.push(
      new FormTextarea({
        key: 'warmPrompt',
        label: '温馨提示',
        value: data && data.warmPrompt || '',
        required: false,
        // errMsg: '请填写温馨提示',
        disabled: !disable,
        order: 3
      })
    );
    forms.push(
      new FormText({
        key: 'departmentLeader',
        label: '主管负责人',
        value: data && data.departmentLeader || '',
        required: true,
        errMsg: '请填写主管负责人',
        disabled: !disable,
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
        disabled: !disable,
        order: 6
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';

const PATH = {
  getServices: '/api/service/menuList',
  editServiceCategory: '/api/service/categorySaveOrUpdate',
  editServiceItem: '/api/service/itemSaveOrUpdate',
  getServiceCategory: '/api/service/getCategoryByMenuId',
  getServiceItem: '/api/service/getItemByMenuId',
};

@Injectable()
export class ServiceService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setServiceConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '服务管理',
      ifHome: true,
      homeRouter: '/service'
    });
  }

  getServices() {
    return this.http.get(`/json/servicelist.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getServices}`);
  }

  getServiceCategory(menuId) {
    return this.http.get(`/json/servicedetail.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getServiceCategory}?menuId=${menuId}`);
  }

  getServiceItem(menuId) {
    return this.http.get(`/json/servicedetail2.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getServiceItem}?menuId=${menuId}`);
  }

  saveServiceCategory(data) {
    return this.http.post(`${this.app.api_url}${PATH.editServiceCategory}`, data);
  }

  saveServiceItem(data) {
    return this.http.post(`${this.app.api_url}${PATH.editServiceCategory}`, data);
  }

  setServiceCategoryFormFirst(parentId, parentName, linkList: Array<any>, data?: any): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'parentId',
        label: '',
        value: parentId,
        required: true
      })
    );
    if (!data) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '父级服务分类名称',
          value: parentName,
          disabled: true
        })
      );
    }
    if (data) {
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: '',
          value: data && data.menuId || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'categoryName',
        label: '服务分类名称',
        value: data && data.categoryName || '',
        maxlength: 20,
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'categoryLink',
        label: '服务分类链接',
        value: data && data.categoryLink || 0,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务分类顺序',
        value: data && data.sort,
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }, {
          id: '8',
          name: '8'
        }, {
          id: '9',
          name: '9'
        }, {
          id: '10',
          name: '10'
        }, {
          id: '11',
          name: '11'
        }, {
          id: '12',
          name: '12'
        }, {
          id: '13',
          name: '13'
        }, {
          id: '14',
          name: '14'
        }, {
          id: '15',
          name: '15'
        }, {
          id: '16',
          name: '16'
        }, {
          id: '17',
          name: '17'
        }, {
          id: '18',
          name: '18'
        }, {
          id: '19',
          name: '19'
        }, {
          id: '20',
          name: '20'
        }],
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'isHomeShow',
        label: '首页是否显示',
        value: data && data.isHomeShow || 1,
        disabled: false,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '首页分类图标',
        value: data && data.imageUrl || '',
        required: false,
        isOptional: true,
        optional: {
          key: 'isHomeShow',
          value: 0
        }
      })
    );
    forms.push(
      new FormText({
        key: 'homeCategoryLink',
        label: '首页分类链接',
        value: data && data.homeCategoryLink || 0,
        required: false,
        isOptional: true,
        optional: {
          key: 'isHomeShow',
          value: 0
        }
      })
    );
    forms.push(
      new FormDropdown({
        key: 'homeSort',
        label: '首页分类顺序',
        value: data && data.homeSort || '1',
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }],
        required: true,
        isOptional: true,
        optional: {
          key: 'isHomeShow',
          value: 0
        }
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || 0,
        disabled: false,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    return forms;
  }

  setServiceCategoryForm(parentId, parentName, linkList: Array<any>, data?: any): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'parentId',
        label: '',
        value: parentId,
        required: true
      })
    );
    if (!data) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '父级服务分类名称',
          value: parentName,
          disabled: true
        })
      );
    }
    if (data) {
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: '',
          value: data && data.menuId || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'categoryName',
        label: '服务分类名称',
        value: data && data.menuName || '',
        maxlength: 20,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'image',
        label: '服务分类图标',
        value: data && data.image || '',
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'categoryLink',
        label: '服务分类链接',
        value: data && data.categoryLink || 0,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务分类顺序',
        value: data && data.sort,
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }, {
          id: '8',
          name: '8'
        }, {
          id: '9',
          name: '9'
        }, {
          id: '10',
          name: '10'
        }, {
          id: '11',
          name: '11'
        }, {
          id: '12',
          name: '12'
        }, {
          id: '13',
          name: '13'
        }, {
          id: '14',
          name: '14'
        }, {
          id: '15',
          name: '15'
        }, {
          id: '16',
          name: '16'
        }, {
          id: '17',
          name: '17'
        }, {
          id: '18',
          name: '18'
        }, {
          id: '19',
          name: '19'
        }, {
          id: '20',
          name: '20'
        }],
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '首页分类图标',
        value: data && data.imageUrl || '',
        required: false,
      })
    );
    forms.push(
      new FormDropdown({
        key: 'homeSort',
        label: '首页分类顺序',
        value: data && data.homeSort || '1',
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }],
        required: true,
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || 0,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    return forms;
  }

  setServiceItemForm(parentId, parentName, linkList: Array<any>, data?: any): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'parentId',
        label: '',
        value: parentId,
        required: true
      })
    );
    if (!data) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '父级服务分类名称',
          value: parentName,
          disabled: true
        })
      );
    }
    if (data) {
      forms.push(
        new FormHidden({
          key: 'menuId',
          label: '',
          value: data && data.menuId || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'serviceName',
        label: '服务项目名称',
        value: data && data.menuName || '',
        maxlength: 20,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'itemImageUrl',
        label: '服务项目图标',
        value: data && data.itemImageUrl || '',
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'linkType',
        label: '链接类型',
        value: data && data.linkType || '1',
        options: [{
          id: '1',
          name: '原生'
        }, {
          id: '2',
          name: 'H5'
        }],
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'serviceItemLink1',
        label: '服务分类链接',
        value: data && data.serviceItemLink1 || '',
        required: true,
        options: linkList,
        isOptional: true,
        optional: {
          key: 'linkType',
          value: '1'
        }
      })
    );
    forms.push(
      new FormText({
        key: 'serviceItemLink',
        label: '服务分类链接',
        value: data && data.serviceItemLink || 0,
        required: true,
        isOptional: true,
        optional: {
          key: 'linkType',
          value: '2'
        }
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务分类顺序',
        value: data && data.sort,
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }, {
          id: '8',
          name: '8'
        }, {
          id: '9',
          name: '9'
        }, {
          id: '10',
          name: '10'
        }, {
          id: '11',
          name: '11'
        }, {
          id: '12',
          name: '12'
        }, {
          id: '13',
          name: '13'
        }, {
          id: '14',
          name: '14'
        }, {
          id: '15',
          name: '15'
        }, {
          id: '16',
          name: '16'
        }, {
          id: '17',
          name: '17'
        }, {
          id: '18',
          name: '18'
        }, {
          id: '19',
          name: '19'
        }, {
          id: '20',
          name: '20'
        }],
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'homeImageUrl',
        label: '首页分类图标',
        value: data && data.homeImageUrl || '',
        required: true,
      })
    );
    forms.push(
      new FormDropdown({
        key: 'homeSort',
        label: '首页分类顺序',
        value: data && data.homeSort || '1',
        options: [{
          id: '1',
          name: '1'
        }, {
          id: '2',
          name: '2'
        }, {
          id: '3',
          name: '3'
        }, {
          id: '4',
          name: '4'
        }, {
          id: '5',
          name: '5'
        }, {
          id: '6',
          name: '6'
        }, {
          id: '7',
          name: '7'
        }],
        required: true,
      })
    );
    forms.push(
      new FormRadio({
        key: 'isLogin',
        label: '是否登入',
        value: data && data.isLogin || 0,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'isRealName',
        label: '是否实名认证',
        value: data && data.isRealName || 0,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否启用',
        value: data && data.delFlag || 0,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true
      })
    );
    return forms;
  }
}

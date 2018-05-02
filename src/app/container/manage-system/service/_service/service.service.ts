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
  getLinks: '/api/getHopLinks',
  deleteService: '/api/service/deleteMenuInfo'
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
    return this.http.get(`${this.app.api_url}${PATH.getServices}`);
  }

  getServiceCategory(menuId) {
    return this.http.get(`${this.app.api_url}${PATH.getServiceCategory}?menuId=${menuId}`);
  }

  getServiceItem(menuId) {
    return this.http.get(`${this.app.api_url}${PATH.getServiceItem}?menuId=${menuId}`);
  }

  saveServiceCategory(data) {
    return this.http.post(`${this.app.api_url}${PATH.editServiceCategory}`, data);
  }

  getLinks() {
    return this.http.get(`${this.app.api_url}${PATH.getLinks}?type=1`)
      .map(res => {
        if (res.code == 0 && res.data && Array.isArray(res.data)) {
          const list = [];
          res.data.forEach(obj => {
            list.push({
              id: obj.hopLinks,
              name: obj.hopLinks
            });
          });
          return list;
        } else {
          return [];
        }
      });
  }

  deleteService(id) {
    return this.http.get(`${this.app.api_url}${PATH.deleteService}?menuIds=${id}`);
  }

  saveServiceItem(data) {
    return this.http.post(`${this.app.api_url}${PATH.editServiceItem}`, data);
  }

  setServiceCategoryFormFirst(parentId, parentName, data?: any, disable?: boolean): FormBase<any>[] {
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
          value: disable ? null : data && data.menuId || '',
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
        disabled: !!disable,
        required: true
      })
    );
    // forms.push(
    //   new FormDropdown({
    //     key: 'categoryLink',
    //     label: '服务分类跳转链接',
    //     value: data && data.categoryLink || 0,
    //     options: linkList,
    //     disabled: !!disable,
    //     required: true
    //   })
    // );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务分类顺序',
        value: data && data.sort || 1,
        options: SortList,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'isHomeShow',
        label: '首页是否显示',
        value: data && data.isHomeShow == 0 ? 0 : (data && data.isHomeShow || 1),
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'homeImageUrl',
        label: '首页分类图标',
        value: data && data.homeImageUrl || '',
        disabled: !!disable,
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
        value: data && data.homeCategorySort || 1,
        options: SortList,
        disabled: !!disable,
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
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        disabled: !!disable,
        required: true
      })
    );
    return forms;
  }

  setServiceCategoryForm(parentId, parentName, data?: any, disable?: boolean): FormBase<any>[] {
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
          value: disable ? null : data && data.menuId || '',
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
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '服务分类图标',
        value: data && data.imageUrl || '',
        disabled: !!disable,
        required: true
      })
    );
    // forms.push(
    //   new FormDropdown({
    //     key: 'categoryLink',
    //     label: '服务分类跳转链接',
    //     value: data && data.categoryLink || 0,
    //     options: linkList,
    //     disabled: !!disable,
    //     required: true
    //   })
    // );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务分类顺序',
        value: data && data.sort,
        options: SortList,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'homeImageUrl',
        label: '首页分类图标',
        value: data && data.homeImageUrl || '',
        disabled: !!disable,
        required: false,
      })
    );
    forms.push(
      new FormDropdown({
        key: 'homeSort',
        label: '首页分类顺序',
        value: data && data.homeCategorySort || 1,
        options: SortList,
        disabled: !!disable,
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
        disabled: !!disable,
        required: true
      })
    );
    return forms;
  }

  setServiceItemForm(parentId, parentName, linkList: Array<any>, data?: any, disable?: boolean): FormBase<any>[] {
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
          value: disable ? null : data && data.menuId || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'serviceName',
        label: '服务项目名称',
        value: data && data.serviceName || '',
        maxlength: 20,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'itemImageUrl',
        label: '服务项目图标',
        value: data && data.itemImageUrl || '',
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'linkType',
        label: '链接类型',
        value: data && data.linkType || '1',
        options: [{
          id: 1,
          name: '原生'
        }, {
          id: 2,
          name: 'H5'
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'serviceItemLink1',
        label: '服务项目跳转链接',
        value: data && data.serviceItemLink1 || '',
        disabled: !!disable,
        required: false,
        options: linkList,
        isOptional: true,
        optional: {
          key: 'linkType',
          value: 1
        }
      })
    );
    forms.push(
      new FormText({
        key: 'serviceItemLink2',
        label: '服务项目跳转链接',
        value: data && data.serviceItemLink2 || '',
        disabled: !!disable,
        required: false,
        isOptional: true,
        optional: {
          key: 'linkType',
          value: 2
        }
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sort',
        label: '服务项目顺序',
        value: data && data.itemSort,
        options: SortList,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'homeImageUrl',
        label: '首页服务图标',
        value: data && data.homeImageUrl || '',
        disabled: !!disable,
        required: true,
      })
    );
    forms.push(
      new FormDropdown({
        key: 'homeSort',
        label: '首页服务顺序',
        value: data && data.homeSort || 1,
        options: SortList,
        disabled: !!disable,
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
        disabled: !!disable,
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
        disabled: !!disable,
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
        disabled: !!disable,
        required: true
      })
    );
    return forms;
  }
}

const SortList = [{
  id: 1,
  name: '1'
}, {
  id: 2,
  name: '2'
}, {
  id: 3,
  name: '3'
}, {
  id: 4,
  name: '4'
}, {
  id: 5,
  name: '5'
}, {
  id: 6,
  name: '6'
}, {
  id: 7,
  name: '7'
}, {
  id: 8,
  name: '8'
}, {
  id: 9,
  name: '9'
}, {
  id: 10,
  name: '10'
}, {
  id: 11,
  name: '11'
}, {
  id: 12,
  name: '12'
}, {
  id: 13,
  name: '13'
}, {
  id: 14,
  name: '14'
}, {
  id: 15,
  name: '15'
}, {
  id: 16,
  name: '16'
}, {
  id: 17,
  name: '17'
}, {
  id: 18,
  name: '18'
}, {
  id: 19,
  name: '19'
}, {
  id: 20,
  name: '20'
}, {
  id: 21,
  name: '21'
}, {
  id: 22,
  name: '22'
}, {
  id: 23,
  name: '23'
}, {
  id: 24,
  name: '24'
}, {
  id: 25,
  name: '25'
}, {
  id: 26,
  name: '26'
}, {
  id: 27,
  name: '27'
}, {
  id: 28,
  name: '28'
}, {
  id: 29,
  name: '29'
}, {
  id: 30,
  name: '30'
}];

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDate } from '../../../../libs/dform/_entity/form-date';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

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
    // return this.http.get(`${this.app.api_url}${PATH.getServiceCategory}?menuId=${menuId}`);
  }

  getServiceItem(menuId) {
    // return this.http.get(`${this.app.api_url}${PATH.getServiceItem}?menuId=${menuId}`);
  }

  setServiceCategoryFormFirst(parentId, parentName, linkList, data?: any): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'parentId',
        label: '',
        value: parentId,
        required: true
      })
    );
    forms.push(
      new FormText({
        key: 'parentName',
        label: '父级服务分类名称',
        value: parentName,
        disabled: true
      })
    );
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
      new FormText({
        key: 'imageUrl',
        label: '首页分类图标',
        value: data && data.imageUrl || '',
        required: true,
        isOptional: true,
        optional: {
          key: 'isHomeShow',
          value: 0
        }
      })
    );
    forms.push(
      new FormText({
        key: 'categoryLink',
        label: '首页分类链接',
        value: data && data.categoryLink || 0,
        required: true,
        isOptional: true,
        optional: {
          key: 'isHomeShow',
          value: 0
        }
      })
    );
    forms.push(
      new FormDropdown({
        key: 'menuId',
        label: '首页分类顺序',
        value: parentName,
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

  // setAccountForm(data?): FormBase<any>[] {
  //   const forms: FormBase<any>[] = [];
  //   forms.push(
  //     new FormText({
  //       key: 'username',
  //       label: '版本号',
  //       value: data && data.username || '',
  //       pattern: '^[A-Za-z0-9.]+$',
  //       required: true,
  //       errMsg: '请填写版本号',
  //       order: 0
  //     })
  //   );
  //   forms.push(
  //     new FormText({
  //       key: 'loginname',
  //       label: '应用图标',
  //       value: data && data.loginname || '',
  //       required: true,
  //       errMsg: '请选择应用图标',
  //       order: 1
  //     })
  //   );
  //   forms.push(
  //     new FormDate({
  //       key: 'telephone',
  //       label: '发布时间',
  //       value: data && data.telephone || '',
  //       required: true,
  //       errMsg: '请选择发布时间',
  //       order: 2
  //     })
  //   );
  //   forms.push(
  //     new FormTextarea({
  //       key: 'roleId',
  //       label: '发布内容',
  //       value: data && data.roleId || '',
  //       maxlength: 300,
  //       required: true,
  //       errMsg: '请填写发布内容',
  //       order: 4
  //     })
  //   );
  //   return forms.sort((a, b) => a.order - b.order);
  // }
}

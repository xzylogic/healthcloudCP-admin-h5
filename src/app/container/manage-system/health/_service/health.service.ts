import { Inject, Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
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
  getHealthTree: '/api/healthManage/queryList',
  getHealthDetail: '/api/healthManage/queryInfo',
  saveHealthClassify: '/api/healthManage/saveClassify',
  saveHealthProject: '/api/healthManage/saveProject',
  updateHealth: '/api/healthManage/updateInfo',
  getUrls: '/api/getHopLinks',
  deleteHealth: '/api/healthManage/delete'
};

@Injectable()
export class HealthService {
  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    @Inject('http') private http
  ) {
  }

  setHealthConfig() {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '健康管理',
      ifHome: true,
      homeRouter: '/health'
    });
  }

  getHealthTree() {
    return this.http.get(`${this.app.api_url}${PATH.getHealthTree}`);
  }

  getHealthDetail(id) {
    return this.http.get(`${this.app.api_url}${PATH.getHealthDetail}?id=${id}`);
  }

  getUrls() {
    return this.http.get(`${this.app.api_url}${PATH.getUrls}?type=2`)
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

  saveHealthClassify(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveHealthClassify}`, data);
  }

  saveHealthProject(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveHealthProject}`, data);
  }

  updateHealth(data) {
    return this.http.post(`${this.app.api_url}${PATH.updateHealth}`, data);
  }

  deleteHealth(id) {
    return this.http.delete(`${this.app.api_url}${PATH.deleteHealth}?id=${id}`);
  }

  setHealthClassifyForm(parentId, parentName, linkList: Array<any>, data?: any, disable?: boolean): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'pid',
        label: '',
        value: parentId,
        required: true
      })
    );
    if (parentName) {
      forms.push(
        new FormText({
          key: 'pidName',
          label: '父级名称',
          value: parentName,
          disabled: true
        })
      );
    }
    if (data) {
      forms.push(
        new FormHidden({
          key: 'id',
          label: '',
          value: disable ? null : data && data.id || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '健康分类名称',
        value: data && data.name || '',
        maxlength: 20,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'type',
        label: '健康分类跳转链接',
        value: data && data.type || 0,
        options: linkList,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sequence',
        label: '健康分类顺序',
        value: data && data.sequence,
        options: [{
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
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'enable',
        label: '是否启用',
        value: data && data.enable || 1,
        options: [{
          id: 1,
          name: '是'
        }, {
          id: 0,
          name: '否'
        }],
        disabled: !!disable,
        required: true
      })
    );
    return forms;
  }

  setHealthProjectForm(classifyId, parentName, linkList: Array<any>, data?: any, disable?: boolean): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormHidden({
        key: 'classify_id',
        label: '',
        value: classifyId,
        required: true
      })
    );
    if (!data) {
      forms.push(
        new FormText({
          key: 'parentName',
          label: '所属健康分类名称',
          value: parentName,
          disabled: true
        })
      );
    }
    if (data) {
      forms.push(
        new FormHidden({
          key: 'id',
          label: '',
          value: disable ? null : data && data.id || '',
          required: true
        })
      );
    }
    forms.push(
      new FormText({
        key: 'name',
        label: '健康项目名称',
        value: data && data.name || '',
        maxlength: 20,
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormFile({
        key: 'ico',
        label: '健康项目图标',
        value: data && data.ico || '',
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'url_type',
        label: '链接类型',
        value: data && data.url_type || 0,
        options: [{
          id: 0,
          name: '原生'
        }, {
          id: 1,
          name: 'H5'
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormDropdown({
        key: 'url0',
        label: '健康项目跳转链接',
        value: data && data.url0 || '',
        options: linkList,
        isOptional: true,
        optional: {
          key: 'url_type',
          value: 0
        },
        disabled: !!disable,
        required: false
      })
    );
    forms.push(
      new FormText({
        key: 'url1',
        label: '健康项目跳转链接',
        value: data && data.url1 || '',
        maxlength: 200,
        isOptional: true,
        optional: {
          key: 'url_type',
          value: 1
        },
        disabled: !!disable,
        required: false
      })
    );
    forms.push(
      new FormDropdown({
        key: 'sequence',
        label: '健康项目顺序',
        value: data && data.sequence,
        options: [{
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
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'certification',
        label: '是否实名认证',
        value: data && data.certification || 0,
        options: [{
          id: 1,
          name: '是'
        }, {
          id: 0,
          name: '否'
        }],
        disabled: !!disable,
        required: true
      })
    );
    forms.push(
      new FormRadio({
        key: 'enable',
        label: '是否启用',
        value: data && data.enable || 1,
        options: [{
          id: 1,
          name: '是'
        }, {
          id: 0,
          name: '否'
        }],
        disabled: !!disable,
        required: true
      })
    );
    return forms;
  }

}

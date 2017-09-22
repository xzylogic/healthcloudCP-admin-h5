import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';

const PATH = {
  getClassifies: '/api/article/categoryList',
  getClassify: '/api/article/categoryInfo',
  saveClassify: '/api/article/categorySave',
  delClassify: '/api/article/deleteCategroy'
};

@Injectable()
export class ArticleClassifyService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getClassifies() {
    return this.http.get(`${this.app.api_url}${PATH.getClassifies}`);
  }

  getClassify(id) {
    return this.http.get(`${this.app.api_url}${PATH.getClassify}?id=${id}`);
  }

  saveClassify(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveClassify}`, data);
  }

  delClassify(id, flag) {
    return this.http.delete(`${this.app.api_url}${PATH.delClassify}?id=${id}&isVisable=${flag}`);
  }

  setArticleClassifyConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '资讯分类',
      ifHome: true,
      homeRouter: '/article-classify'
    });
  }

  setArticleClassifyEditConfig(flag) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: flag ? '编辑资讯分类' : '新增资讯分类',
      ifHome: false,
      homeRouter: '/article-classify'
    });
  }

  setArticleClassifyTable() {
    return [
      new TableTitle({
        key: 'id',
        name: '排序'
      }),
      new TableTitle({
        key: 'categoryName',
        name: '文章分类'
      }),
      new TableTitle({
        key: 'updateTime',
        name: '更新时间'
      }),
      new TableTitle({
        key: 'status',
        name: '是否启用'
      }),
      new TableTitle({
        key: '',
        name: '操作',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: '编辑'
        }, {
          key: 'statusName',
          name: ''
        }]
      }),
    ];
  }

  setArticleClassifyForm(data?) {
    const form: FormBase<any>[] = [];
    if (data && data.id) {
      form.push(new FormHidden({
        key: 'id',
        label: '#',
        value: data.id,
        required: true,
        order: 0
      }));
    }

    form.push(new FormText({
      key: 'categoryName',
      label: '分类名称',
      value: data && data.categoryName || '',
      required: true,
      order: 1
    }));

    form.push(new FormRadio({
      key: 'isVisable',
      label: '是否启用',
      value: data && (data.isVisable == 0 ? data.isVisable : data.isVisable || '') || 0,
      options: [{
        id: 0,
        name: '启用'
      }, {
        id: 1,
        name: '禁用'
      }],
      required: true,
      order: 2
    }));

    form.push(new FormText({
      key: 'rank',
      label: '分类排序',
      value: data && data.rank || '',
      required: true,
      order: 3
    }));

    return form.sort((a, b) => a.order - b.order);

  }
}

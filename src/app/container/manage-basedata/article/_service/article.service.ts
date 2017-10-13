import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';

const PATH = {
  getArticles: '/api/article/list',
  getArticle: '/api/article/info',
  saveArticle: '/api/article/saveOrUpdate',
  getClassifies: '/api/article/categoryList',
};

@Injectable()
export class ArticleService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  getClassifies() {
    return this.http.get(`${this.app.api_url}${PATH.getClassifies}?isVisable=0`);
  }

  getArticles(page, size, title, startTime, endTime, classifyId) {
    return this.http.post(`${this.app.api_url}${PATH.getArticles}`, {
      number: page + 1,
      size: size,
      parameter: {
        title: title,
        startTime: startTime,
        endTime: endTime,
        categoryId: classifyId.toString()
      }
    });
  }

  getArticle(id) {
    return this.http.get(`${this.app.api_url}${PATH.getArticle}?id=${id}`);
  }

  saveArticle(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveArticle}`, data);
  }

  setArticleConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '文章库',
      ifHome: true,
      homeRouter: '/article'
    });
  }

  setArticleEditConfig(flag) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: flag ? '编辑文章' : '新增文章',
      ifHome: false,
      homeRouter: '/article'
    });
  }

  setArticleTable() {
    return [
      new TableTitle({
        key: 'id',
        name: 'ID'
      }),
      new TableTitle({
        key: 'title',
        name: '文章标题'
      }),
      new TableTitle({
        key: 'categoryName',
        name: '资讯分类'
      }),
      new TableTitle({
        key: 'updateTime',
        name: '更新时间',
        controlType: ControlType.date
      }),
      new TableTitle({
        key: '',
        name: '操作',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: '编辑'
        }, {
          key: 'detail',
          name: '预览'
        }]
      }),
    ];
  }

  setArticleForm(classifyList, data?) {
    const forms: FormBase<any>[] = [];
    if (data && data.id) {
      forms.push(
        new FormHidden({
          key: 'id',
          label: '',
          value: data.id,
          required: true,
          order: 0
        }));
    }

    forms.push(
      new FormText({
        key: 'title',
        label: '文章标题',
        value: data && data.title || '',
        required: true,
        errMsg: '请填写文章标题',
        maxlength: 20,
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'brief',
        label: '描述',
        value: data && data.brief || '',
        required: true,
        errMsg: '请填写文章描述',
        maxlength: 30,
        order: 2
      })
    );
    forms.push(
      new FormFile({
        key: 'thumb',
        label: '图片(请上传不大于150KB的JPG或者PNG图片)',
        value: data && data.thumb || '',
        required: true,
        url: '',
        errMsg: '',
        size: 150,
        order: 3
      })
    );
    forms.push(
      new FormFile({
        key: 'recommImageUrl',
        label: '推荐图片(请上传不大于150KB的JPG或者PNG图片，建议比例1：3)',
        value: data && data.recommImageUrl || '',
        required: false,
        url: '',
        errMsg: '',
        size: 150,
        order: 4
      })
    );
    forms.push(
      new FormEditor({
        key: 'content',
        label: '内容',
        value: data && data.content || '',
        required: true,
        errMsg: '请填写文章内容',
        order: 5
      })
    );
    forms.push(
      new FormText({
        key: 'keyword',
        label: '关键字（可输入多个关键字，用逗号分隔）',
        value: data && data.keyword || '',
        required: true,
        errMsg: '请填写关键字',
        order: 6
      })
    );
    forms.push(
      new FormText({
        key: 'author',
        label: '文章作者',
        value: data && data.author || '',
        required: true,
        errMsg: '请填写文章作者',
        order: 7
      })
    );
    forms.push(
      new FormDropdown({
        key: 'categoryId',
        label: '资讯分类',
        value: data && data.categoryId || '',
        required: true,
        options: classifyList,
        errMsg: '请选择资讯分类',
        order: 8
      })
    );
    forms.push(
      new FormText({
        key: 'fakePv',
        label: '预设阅读量',
        value: data && data.fakePv || '',
        required: true,
        errMsg: '请填写正确的预设阅读量（非负整数）',
        pattern: `^[0-9]*$`,
        order: 9
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

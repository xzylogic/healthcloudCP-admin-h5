import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

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
    return this.http.get(`${this.app.api_url}${PATH.getClassifies}`);
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

  save(data) {
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
}

import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getArticleTitle: '/api/article/queryArticleByTitleName',
  getHomeArticles: '/home/article/list',
  getHomeArticle: '/home/article/detail',
  saveHomeArticle: '/home/article/saveOrupdate'
};

@Injectable()
export class ArticleHomeService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  getArticleTitle(title) {
    return this.http.get(`${this.app.api_url}${PATH.getArticleTitle}?title=${title}`);
  }

  getHomeArticles(page, size, title, status) {
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (title) {
      query.title = title;
    }
    return this.http.post(`${this.app.api_url}${PATH.getHomeArticles}`, {
      number: page + 1,
      size: size,
      parameter: query
    });
  }

  getHomeArticle(id) {
    return this.http.get(`${this.app.api_url}${PATH.getHomeArticle}?id=${id}`);
  }

  saveHomeArticle(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveHomeArticle}`, data);
  }

  setArticleHomeConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '首页资讯',
      ifHome: true,
      homeRouter: '/article-home'
    });
  }

  setArticleHomeEditConfig(flag) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: flag ? '编辑首页资讯' : '新增首页资讯',
      ifHome: false,
      homeRouter: '/article-home'
    });
  }

  setArticleHomeTable() {
    return [
      new TableTitle({
        key: 'id',
        name: '排序'
      }),
      new TableTitle({
        key: 'title',
        name: '文章标题'
      }),
      new TableTitle({
        key: 'title',
        name: '文章ID'
      }),
      new TableTitle({
        key: 'startTime',
        name: '开始时间段',
      }),
      new TableTitle({
        key: 'endTime',
        name: '结束时间段',
      }),
      new TableTitle({
        key: 'recommend',
        name: '是否推荐',
      }),
      new TableTitle({
        key: 'statusName',
        name: '状态',
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
          name: ''
        }]
      }),
    ];
  }
}

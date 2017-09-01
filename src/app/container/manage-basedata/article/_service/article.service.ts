import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class ArticleService {
  constructor() {
  }

  setArticleConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '文章库',
      ifHome: true,
      homeRouter: '/article'
    });
  }
}

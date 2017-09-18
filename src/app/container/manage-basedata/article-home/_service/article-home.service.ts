import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class ArticleHomeService {
  constructor() {
  }

  setArticleHomeConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '首页资讯',
      ifHome: true,
      homeRouter: '/article-home'
    });
  }
}

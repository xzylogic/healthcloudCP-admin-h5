import { Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Injectable()
export class ArticleClassifyService {
  constructor() {
  }

  setArticleClassifyConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '资讯分类',
      ifHome: true,
      homeRouter: '/article-classify'
    });
  }
}

import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'article',
  loadChildren: 'app/container/manage-basedata/article/article.module#ArticleModule'
}, {
  path: 'article-classify',
  loadChildren: 'app/container/manage-basedata/article-classify/article-classify.module#ArticleClassifyModule'
}, {
  path: 'article-home',
  loadChildren: 'app/container/manage-basedata/article-home/article-home.module#ArticleHomeModule'
}, {
  path: 'banner',
  loadChildren: 'app/container/manage-basedata/banner/banner.module#BannerModule'
}, {
  path: 'feedback',
  loadChildren: 'app/container/manage-basedata/feedback/feedback.module#FeedbackModule'
}, {
  path: 'message',
  loadChildren: 'app/container/manage-basedata/message/message.module#MessageModule'
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

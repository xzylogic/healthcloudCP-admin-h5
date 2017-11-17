import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'article/:menu',
  loadChildren: 'app/container/manage-basedata/article/article.module#ArticleModule'
}, {
  path: 'article-classify/:menu',
  loadChildren: 'app/container/manage-basedata/article-classify/article-classify.module#ArticleClassifyModule'
}, {
  path: 'article-home/:menu',
  loadChildren: 'app/container/manage-basedata/article-home/article-home.module#ArticleHomeModule'
}, {
  path: 'banner/:menu',
  loadChildren: 'app/container/manage-basedata/banner/banner.module#BannerModule'
}, {
  path: 'feedback/:menu',
  loadChildren: 'app/container/manage-basedata/feedback/feedback.module#FeedbackModule'
// }, {
//   path: 'message/:menu',
//   loadChildren: 'app/container/manage-basedata/message/message.module#MessageModule'
}, {
  path: 'health-file',
  loadChildren: 'app/container/manage-basedata/health-file/health-file.module#HealthFileModule'
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

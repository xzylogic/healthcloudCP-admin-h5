import { NgModule } from '@angular/core';
import { ArticleClassifyComponent } from './article-classify.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleClassifyService } from './_service/article-classify.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: ArticleClassifyComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleClassifyComponent
  ],
  providers: [
    ArticleClassifyService,
    {provide: 'classify', useClass: ArticleClassifyService}
  ]
})
export class ArticleClassifyModule {
}

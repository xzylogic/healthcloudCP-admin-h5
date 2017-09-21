import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleService } from './_service/article.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailModule } from './article-detail/article-detail.module';

const routes: Routes = [{
  path: '',
  component: ArticleComponent
}, {
  path: 'edit',
  component: ArticleEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    ArticleDetailModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleComponent,
    ArticleEditComponent
  ],
  providers: [
    ArticleService,
    {provide: 'article', useClass: ArticleService}
  ]
})
export class ArticleModule {
}

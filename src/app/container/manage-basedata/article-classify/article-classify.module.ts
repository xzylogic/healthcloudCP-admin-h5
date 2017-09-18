import { NgModule } from '@angular/core';
import { ArticleClassifyComponent } from './article-classify.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleClassifyService } from './_service/article-classify.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { ArticleClassifyEditComponent } from './article-classify-edit/article-classify-edit.component';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: ArticleClassifyComponent
}, {
  path: 'edit',
  component: ArticleClassifyEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleClassifyComponent,
    ArticleClassifyEditComponent
  ],
  providers: [
    ArticleClassifyService,
    {provide: 'classify', useClass: ArticleClassifyService}
  ]
})
export class ArticleClassifyModule {
}

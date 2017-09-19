import { NgModule } from '@angular/core';
import { ArticleHomeComponent } from './article-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleHomeService } from './_service/article-home.service';
import { LibModule } from '../../../libs/common/lib.module';
import { ArticleHomeEditComponent } from './article-home-edit/article-home-edit.component';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: ArticleHomeComponent
}, {
  path: 'edit',
  component: ArticleHomeEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleHomeComponent,
    ArticleHomeEditComponent
  ],
  providers: [
    ArticleHomeService,
    {provide: 'home', useClass: ArticleHomeService}
  ]
})
export class ArticleHomeModule {
}

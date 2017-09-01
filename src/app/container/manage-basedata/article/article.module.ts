import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleService } from './_service/article.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: ArticleComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleComponent
  ],
  providers: [
    ArticleService,
    {provide: 'article', useClass: ArticleService}
  ]
})
export class ArticleModule {
}

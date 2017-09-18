import { NgModule } from '@angular/core';
import { ArticleHomeComponent } from './article-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ArticleHomeService } from './_service/article-home.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: ArticleHomeComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticleHomeComponent
  ],
  providers: [
    ArticleHomeService,
    {provide: 'home', useClass: ArticleHomeService}
  ]
})
export class ArticleHomeModule {
}

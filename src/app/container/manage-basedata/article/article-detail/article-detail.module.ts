import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdListModule } from '@angular/material';

import { ArticleDetailComponent } from './article-detail.component';
import { PipeModule } from '../../../../libs/_pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdListModule,
    PipeModule
  ],
  declarations: [
    ArticleDetailComponent
  ],
  entryComponents: [
    ArticleDetailComponent
  ],
  exports: [
    ArticleDetailComponent
  ]
})
export class ArticleDetailModule {
}

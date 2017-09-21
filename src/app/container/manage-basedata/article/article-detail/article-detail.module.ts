import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdListModule } from '@angular/material';

import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdListModule
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

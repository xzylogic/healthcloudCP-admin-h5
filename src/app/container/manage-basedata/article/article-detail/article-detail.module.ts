import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatListModule } from '@angular/material';

import { ArticleDetailComponent } from './article-detail.component';
import { PipeModule } from '../../../../libs/_pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
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

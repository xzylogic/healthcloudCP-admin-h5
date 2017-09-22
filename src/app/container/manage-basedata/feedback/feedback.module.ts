import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackService } from './_service/feedback.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { LibInputModule } from '../../../libs/dform/lib-input.module';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';

const routes: Routes = [{
  path: '',
  component: FeedbackComponent
}, {
  path: 'detail/:id',
  component: FeedbackDetailComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    LibInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeedbackComponent,
    FeedbackDetailComponent
  ],
  providers: [
    FeedbackService,
    {provide: 'feedback', useClass: FeedbackService}
  ]
})
export class FeedbackModule {
}

import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackService } from './_service/feedback.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: FeedbackComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [
    FeedbackService,
    {provide: 'feedback', useClass: FeedbackService}
  ]
})
export class FeedbackModule {
}

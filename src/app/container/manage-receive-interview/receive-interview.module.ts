import { NgModule } from '@angular/core';
import { LibModule } from '../../libs/common/lib.module';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveInterviewComponent } from './receive-interview.component';
import { ReceiveInterviewService } from './_service/receive-interview.service';
import { ReceiveInterviewDetailComponent } from './receive-interview-detail/receive-interview-detail.component';

const routes: Routes = [{
  path: '',
  component: ReceiveInterviewComponent
}, {
  path: 'detail',
  component: ReceiveInterviewDetailComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReceiveInterviewComponent,
    ReceiveInterviewDetailComponent
  ],
  providers: [
    ReceiveInterviewService,
    {provide: 'interview', useClass: ReceiveInterviewService}
  ]
})
export class ReceiveInterviewModule {
}

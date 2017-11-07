import { NgModule } from '@angular/core';
import { LibModule } from '../../libs/common/lib.module';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveInterviewComponent } from './receive-interview.component';
import { ReceiveInterviewService } from './_service/receive-interview.service';
import { ReceiveInterviewDetailComponent } from './receive-interview-detail/receive-interview-detail.component';
import { DTableModule } from '../../libs/dtable/dtable.module';
import { DFormModule } from '../../libs/dform/dform.module';
import { MdTabsModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: ReceiveInterviewComponent
}, {
  path: 'detail/:id',
  component: ReceiveInterviewDetailComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    MdTabsModule,
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

import { NgModule } from '@angular/core';
import { LibModule } from '../../libs/common/lib.module';
import { RouterModule, Routes } from '@angular/router';
import { PregnancyInterviewComponent } from './pregnancy-interview.component';
import { PregnancyInterviewService } from './_service/pregnancy-interview.service';
import { PregnancyInterviewDetailComponent } from './pregnancy-interview-detail/pregnancy-interview-detail.component';
import { CommonModule } from '@angular/common';
import { DFormModule } from '../../libs/dform/dform.module';
import { DTableModule } from '../../libs/dtable/dtable.module';
import { MatTabsModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: PregnancyInterviewComponent
}, {
  path: 'detail',
  component: PregnancyInterviewDetailComponent
}];

@NgModule({
  imports: [
    CommonModule,
    LibModule,
    DFormModule,
    DTableModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PregnancyInterviewComponent,
    PregnancyInterviewDetailComponent
  ],
  providers: [
    PregnancyInterviewService,
    {provide: 'interview', useClass: PregnancyInterviewService}
  ]
})
export class PregnancyInterviewModule {
}

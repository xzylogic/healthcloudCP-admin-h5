import { NgModule } from '@angular/core';
import { LibModule } from '../../libs/common/lib.module';
import { RouterModule, Routes } from '@angular/router';
import { HealthFileService } from '../manage-basedata/health-file/_service/health-file.service';
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
  path: 'detail/:id',
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
    HealthFileService,
    {provide: 'interview', useClass: PregnancyInterviewService},
    {provide: 'health', useClass: HealthFileService}
  ]
})
export class PregnancyInterviewModule {
}

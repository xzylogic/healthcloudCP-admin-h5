import { NgModule } from '@angular/core';
import { LibModule } from '../../libs/common/lib.module';
import { RouterModule, Routes } from '@angular/router';
import { PregnancyInterviewComponent } from './pregnancy-interview.component';
import { PregnancyInterviewService } from './_service/pregnancy-interview.service';
import { PregnancyInterviewDetailComponent } from './pregnancy-interview-detail/pregnancy-interview-detail.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCheckboxModule, MdDatepickerModule, MdInputModule, MdRadioModule, MdTabsModule } from '@angular/material';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    MdCheckboxModule,
    MdInputModule,
    MdRadioModule,
    MdButtonModule,
    MdTabsModule,
    MdDatepickerModule,
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

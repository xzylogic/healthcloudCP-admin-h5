import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdTabsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanCommonComponent } from './plan-common.component';
import { PlanCommonService } from './plan-common.service';
import { LibModule } from '../../libs/common/lib.module';
import { DFormModule } from '../../libs/dform/dform.module';

const routes: Routes = [{
  path: ':date/:type',
  component: PlanCommonComponent
}];

@NgModule({
  imports: [
    CommonModule,
    LibModule,
    MdTabsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlanCommonComponent
  ],
  providers: [
    PlanCommonService,
    {provide: 'plancommon', useClass: PlanCommonService},
  ],
  exports: [
    PlanCommonComponent
  ]
})
export class PlanCommonModule {
}

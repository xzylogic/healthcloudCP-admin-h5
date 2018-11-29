import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanService } from './_service/plan.service';
import { LibModule } from '../../../libs/common/lib.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { PlanCommonModule } from '../../common/plan-common.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { PlanComponent } from './plan.component';
import { AgePeriodComponent } from './ageperiod.component';

const routes: Routes = [{
  path: '',
  component: PlanComponent
}, {
  path: 'edit',
  loadChildren: 'app/container/common/plan-common.module#PlanCommonModule'
}];

@NgModule({
  imports: [
    CommonModule,
    LibModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    DFormModule,
    PlanCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlanComponent,
    AgePeriodComponent
  ],
  providers: [
    PlanService,
    {provide: 'plan', useClass: PlanService},
  ]
})
export class PFCPlanModule {
}

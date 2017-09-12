import { NgModule } from '@angular/core';
import { PlanComponent } from './plan.component';
import { RouterModule, Routes } from '@angular/router';
import { PlanService } from './_service/plan.service';
import { LibModule } from '../../../libs/common/lib.module';
import { MdButtonModule, MdCheckboxModule, MdTabsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    MdTabsModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PlanComponent
  ],
  providers: [
    PlanService,
    {provide: 'plan', useClass: PlanService},
  ]
})
export class PIPlanModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { HealthService } from './_service/health.service';
import { HealthComponent } from './health.component';

const routes: Routes = [{
  path: '',
  component: HealthComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthComponent
  ],
  providers: [
    HealthService,
    {provide: 'health', useClass: HealthService},
  ]
})
export class HealthModule {
}

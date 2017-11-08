import { NgModule } from '@angular/core';
import { HealthFileComponent } from './health-file.component';
import { HealthFileService } from './_service/health-file.service';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { MatTabsModule } from '@angular/material';

const routes: Routes = [{
  path: ':id',
  component: HealthFileComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthFileComponent
  ],
  providers: [
    HealthFileService,
    {provide: 'healthfile', useClass: HealthFileService}
  ]
})
export class HealthFileModule {
}

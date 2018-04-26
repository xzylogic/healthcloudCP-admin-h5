import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { UpdateService } from './_service/update.service';
import { UpdateComponent } from './update.component';

const routes: Routes = [{
  path: '',
  component: UpdateComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UpdateComponent
  ],
  providers: [
    UpdateService,
    {provide: 'update', useClass: UpdateService},
  ]
})
export class UpdateModule {
}

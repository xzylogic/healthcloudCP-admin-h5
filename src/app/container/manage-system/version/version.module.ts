import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { VersionService } from './_service/version.service';
import { VersionComponent } from './version.component';

const routes: Routes = [{
  path: '',
  component: VersionComponent
// }, {
//   path: 'edit',
//   component:
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    VersionComponent
  ],
  providers: [
    VersionService,
    {provide: 'version', useClass: VersionService},
  ]
})
export class VersionModule {
}

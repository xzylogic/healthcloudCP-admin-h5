import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { VersionService } from './_service/version.service';
import { VersionEditComponent } from './version-edit/version-edit.component';
import { VersionComponent } from './version.component';

const routes: Routes = [{
  path: '',
  component: VersionComponent
}, {
  path: 'edit',
  component: VersionEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    VersionComponent,
    VersionEditComponent
  ],
  providers: [
    VersionService,
    {provide: 'version', useClass: VersionService},
  ]
})
export class VersionModule {
}

import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleService } from './_service/role.service';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { RoleEditComponent } from './role-edit/role-edit.component';

const routes: Routes = [{
  path: '',
  component: RoleComponent
}, {
  path: 'edit',
  component: RoleEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RoleComponent,
    RoleEditComponent
  ],
  providers: [
    RoleService,
    {provide: 'role', useClass: RoleService}
  ]
})
export class RoleModule {
}

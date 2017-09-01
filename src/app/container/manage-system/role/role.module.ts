import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleService } from './_service/role.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: RoleComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RoleComponent
  ],
  providers: [
    RoleService,
    {provide: 'role', useClass: RoleService}
  ]
})
export class RoleModule {
}

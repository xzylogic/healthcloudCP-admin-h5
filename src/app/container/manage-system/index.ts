import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'menu/:menu',
  loadChildren: 'app/container/manage-system/menu/menu.module#MenuModule'
}, {
  path: 'organization/:menu',
  loadChildren: 'app/container/manage-system/organization/organization.module#OrganizationModule'
}, {
  path: 'role/:menu',
  loadChildren: 'app/container/manage-system/role/role.module#RoleModule'
}, {
  path: 'account/:menu',
  loadChildren: 'app/container/manage-system/account/account.module#AccountModule'
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

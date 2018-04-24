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
}, {
  path: 'health/:menu',
  loadChildren: 'app/container/manage-system/health/health.module#HealthModule'
}, {
  path: 'service/:menu',
  loadChildren: 'app/container/manage-system/service/service.module#ServiceModule'
}, {
  path: 'version/:menu',
  loadChildren: 'app/container/manage-system/version/version.module#VersionModule'
}];

export const stores = {
  version: createReducer('version', [0, 0, 0], {}),
};

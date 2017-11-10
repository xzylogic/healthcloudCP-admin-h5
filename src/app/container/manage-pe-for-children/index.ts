import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'pe-for-children',
  children: [
    {
      path: '',
      redirectTo: '/plan',
      pathMatch: 'full'
    },
    {
      path: 'plan/:menu',
      loadChildren: 'app/container/manage-pe-for-children/plan/plan.module#PFCPlanModule'
    },
    {
      path: 'appointment/:menu',
      loadChildren: 'app/container/manage-pe-for-children/appointment/appointment.module#PFCAppointmentModule'
    }
  ]
}];

export const stores = {
  'pe-for-children': createReducer('pe-for-children', [0], null),
  'pe-for-children-plan': createReducer('pe-for-children-plan', [0], null),
};

import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'mac-database',
  children: [
    {
      path: '',
      redirectTo: '/plan',
      pathMatch: 'full'
    },
    {
      path: 'plan/:menu',
      loadChildren: 'app/container/manage-mac-database/plan/plan.module#MDPlanModule'
    },
    {
      path: 'appointment/:menu',
      loadChildren: 'app/container/manage-mac-database/appointment/appointment.module#MDAppointmentModule'
    }
  ]
}];

export const stores = {
  'mac-database': createReducer('mac-database', [0], null),
  'mac-database-plan': createReducer('mac-database-plan', [0], null),
};

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
      path: 'plan',
      loadChildren: 'app/container/manage-mac-database/plan/plan.module#MDPlanModule'
    },
    {
      path: 'appointment',
      loadChildren: 'app/container/manage-mac-database/appointment/appointment.module#MDAppointmentModule'
    }
  ]
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

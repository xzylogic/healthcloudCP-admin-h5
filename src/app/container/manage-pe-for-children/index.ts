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
      path: 'plan',
      loadChildren: 'app/container/manage-pe-for-children/plan/plan.module#PFCPlanModule'
    },
    {
      path: 'appointment',
      loadChildren: 'app/container/manage-pe-for-children/appointment/appointment.module#PFCAppointmentModule'
    }
  ]
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

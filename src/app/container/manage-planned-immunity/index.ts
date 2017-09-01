import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'planned-immunity',
  children: [
    {
      path: '',
      redirectTo: '/plan',
      pathMatch: 'full',
    },
    {
      path: 'plan',
      loadChildren: 'app/container/manage-planned-immunity/plan/plan.module#PIPlanModule'
    },
    {
      path: 'appointment',
      loadChildren: 'app/container/manage-planned-immunity/appointment/appointment.module#PIAppointmentModule'
    }
  ]
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

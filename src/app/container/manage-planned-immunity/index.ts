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
  'planned-immunity': createReducer('planned-immunity', [0], null),
  'planned-immunity-plan': createReducer('planned-immunity-plan', [0], null),
};

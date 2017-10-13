import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'receive-folic-acid',
  children: [
    {
      path: '',
      redirectTo: '/plan',
      pathMatch: 'full'
    },
    {
      path: 'plan',
      loadChildren: 'app/container/manage-receive-folic-acid/plan/plan.module#RFAPlanModule'
    },
    {
      path: 'appointment',
      loadChildren: 'app/container/manage-receive-folic-acid/appointment/appointment.module#RFAAppointmentModule'
    }
  ]
}];

export const stores = {
  'receive-folic-acid': createReducer('receive-folic-acid', [0], null),
};

import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'pregnancy-interview/:menu',
  children: [
    {
      path: '',
      loadChildren: 'app/container/manage-pregnancy-interview/pregnancy-interview.module#PregnancyInterviewModule'
    }
  ]
}];

export const stores = {
  'pregnancy-interview': createReducer('pregnancy-interview', [0], null),
};

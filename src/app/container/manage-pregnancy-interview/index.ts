import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'pregnancy-interview',
  children: [
    {
      path: '',
      loadChildren: 'app/container/manage-pregnancy-interview/pregnancy-interview.module#PregnancyInterviewModule'
    }
  ]
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

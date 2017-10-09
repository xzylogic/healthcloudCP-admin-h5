import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'receive-interview',
  children: [
    {
      path: '',
      loadChildren: 'app/container/manage-receive-interview/receive-interview.module#ReceiveInterviewModule'
    }
  ]
}];

export const stores = {
  // doctor: createReducer('doctor', [0, 0, 0], {}),
};

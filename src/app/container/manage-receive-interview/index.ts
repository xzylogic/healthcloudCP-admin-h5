import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'receive-interview/:menu',
  children: [
    {
      path: '',
      loadChildren: 'app/container/manage-receive-interview/receive-interview.module#ReceiveInterviewModule'
    }
  ]
}];

export const stores = {
  'receive-interview': createReducer('receive-interview', [0], null),
};

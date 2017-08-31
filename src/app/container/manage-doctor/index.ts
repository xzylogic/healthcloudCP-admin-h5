import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'doctor',
  loadChildren: 'app/container/manage-doctor/doctor/doctor.module#DoctorModule'
}];

export const stores = {
  doctor: createReducer('doctor', [0, 0, 0], {}),
};

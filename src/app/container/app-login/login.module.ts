import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdToolbarModule } from '@angular/material';

import { LoginComponent } from './login.component';
import { LibInputModule } from '../../libs/dform/lib-input.module';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  imports: [
    LibInputModule,
    MdToolbarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}

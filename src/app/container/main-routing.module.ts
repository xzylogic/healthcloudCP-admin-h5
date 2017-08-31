import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { WelcomeComponent } from './welcome.component';
import { routes as doctorRoutes } from './manage-doctor';

@NgModule({
  imports: [RouterModule.forChild([{
      path: 'login',
      loadChildren: 'app/container/app-login/login.module#LoginModule'
    }, {
      path: '',
      component: MainComponent,
      children: [
        {
          path: '',
          component: WelcomeComponent
        },
        ...doctorRoutes,
      ]
    }]
  )],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

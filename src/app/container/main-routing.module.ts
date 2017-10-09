import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { WelcomeComponent } from './welcome.component';
import { routes as systemRoutes } from './manage-system';
import { routes as basedataRoutes } from './manage-basedata';
import { routes as mdRoutes } from './manage-mac-database';
import { routes as pfcRoutes } from './manage-pe-for-children';
import { routes as piRoutes } from './manage-planned-immunity';
import { routes as rfaRoutes } from './manage-receive-folic-acid';
import { routes as preRoutes } from './manage-pregnancy-interview';
import { routes as riRoutes } from './manage-receive-interview';
import { AuthGuardService } from './_service/auth-guard.service';

@NgModule({
  imports: [RouterModule.forChild([{
      path: 'login',
      loadChildren: 'app/container/app-login/login.module#LoginModule'
    }, {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          component: WelcomeComponent
        },
        ...systemRoutes,
        ...basedataRoutes,
        ...mdRoutes,
        ...pfcRoutes,
        ...piRoutes,
        ...rfaRoutes,
        ...preRoutes,
        ...riRoutes,
      ]
    }, {
      path: '**',
      redirectTo: '/',
      pathMatch: 'full'
    }]
  )],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

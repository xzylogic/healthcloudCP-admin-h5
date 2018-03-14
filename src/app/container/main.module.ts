import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {
  MatButtonModule, MatChipsModule,
  MatIconModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavigationComponent } from './navigation/navigtion.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthService } from './_service/auth.service';
import { HttpService } from '../libs/_service/http.service';
import { NavigationService } from './_service/navigation.service';

import { app } from '../../environments/environment';

import { LibDialogModule } from '../libs/dmodal/dialog.module';
import { LibDialogEditModule } from '../libs/dmodal/dialog-edit.module';
import { StoreModule } from './store.module';
import { MainAction } from './_store/main.action';
import { ApiAction } from './_store/api/api.action';
import { CommonService } from './_service/common.service';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    StoreModule,
    LibDialogModule,
    LibDialogEditModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    WelcomeComponent,
    NavigationComponent
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuardService,
    NavigationService,
    MainAction,
    ApiAction,
    CommonService,
    {provide: 'http', useClass: HttpService},
    {provide: 'auth', useClass: AuthService},
    {provide: 'nav', useClass: NavigationService},
    {provide: 'common', useClass: CommonService},
    {provide: 'main', useClass: MainAction},
    {provide: 'action', useClass: ApiAction},
    {provide: 'app', useValue: app},
  ]
})
export class MainModule {
}

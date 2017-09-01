import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountService } from './_service/account.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AccountComponent
  ],
  providers: [
    AccountService,
    {provide: 'account', useClass: AccountService},
  ]
})
export class AccountModule {
}

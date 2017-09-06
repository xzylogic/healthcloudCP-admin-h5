import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountService } from './_service/account.service';
import { LibModule } from '../../../libs/common/lib.module';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}, {
  path: 'edit',
  component: AccountEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AccountComponent,
    AccountEditComponent
  ],
  providers: [
    AccountService,
    {provide: 'account', useClass: AccountService},
  ]
})
export class AccountModule {
}

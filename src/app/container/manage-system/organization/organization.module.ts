import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationService } from './_service/organization.service';
import { LibModule } from '../../../libs/common/lib.module';
import { CommonModule } from '@angular/common';
import { DFormModule } from '../../../libs/dform/dform.module';
import { MatButtonModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { TreenodeComponent } from './treenode.component';

const routes: Routes = [{
  path: '',
  component: OrganizationComponent
}];

@NgModule({
  imports: [
    CommonModule,
    LibModule,
    DFormModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrganizationComponent,
    TreenodeComponent
  ],
  providers: [
    OrganizationService,
    {provide: 'organization', useClass: OrganizationService}
  ]
})
export class OrganizationModule {
}

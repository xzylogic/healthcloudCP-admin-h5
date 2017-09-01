import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationService } from './_service/organization.service';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  component: OrganizationComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrganizationComponent
  ],
  providers: [
    OrganizationService,
    {provide: 'organization', useClass: OrganizationService}
  ]
})
export class OrganizationModule {
}

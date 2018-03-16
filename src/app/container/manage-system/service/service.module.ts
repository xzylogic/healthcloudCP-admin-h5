import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DtreeModule } from '../../../libs/dtree/dtree.module';
import { ServiceService } from './_service/service.service';
import { ServiceComponent } from './service.component';

const routes: Routes = [{
  path: '',
  component: ServiceComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    DtreeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ServiceComponent
  ],
  providers: [
    ServiceService,
    {provide: 'service', useClass: ServiceService},
  ]
})
export class ServiceModule {
}

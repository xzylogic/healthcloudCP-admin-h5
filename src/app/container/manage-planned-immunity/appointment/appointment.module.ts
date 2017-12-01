import { NgModule } from '@angular/core';
import { HealthFileService } from '../../manage-basedata/health-file/_service/health-file.service';
import { AppointmentComponent } from './appointment.component';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { AppointmentService } from './_service/appointment.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';

const routes: Routes = [{
  path: '',
  component: AppointmentComponent
}, {
  path: 'detail/:id',
  component: AppointmentDetailComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointmentComponent,
    AppointmentDetailComponent
  ],
  providers: [
    AppointmentService,
    HealthFileService,
    {provide: 'appointment', useClass: AppointmentService},
    {provide: 'health', useClass: HealthFileService}
  ]
})
export class PIAppointmentModule {
}

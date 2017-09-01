import { NgModule } from '@angular/core';
import { AppointmentComponent } from './appointment.component';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { AppointmentService } from './_service/appointment.service';

const routes: Routes = [{
  path: '',
  component: AppointmentComponent
}];

@NgModule({
  imports: [
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointmentComponent
  ],
  providers: [
    AppointmentService,
    {provide: 'appointment', useClass: AppointmentService}
  ]
})
export class RFAAppointmentModule {
}

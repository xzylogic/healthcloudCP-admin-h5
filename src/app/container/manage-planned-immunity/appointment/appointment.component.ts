import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-planned-immunity-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('appointment') private appointmentService) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentConfig();
  }
}

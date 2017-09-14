import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  id: string;
  data: any;

  constructor(
    @Inject('appointment') private appointmentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.id = route.id;
        this.getDetail(route.id);
      }
    });
  }

  getDetail(id) {
    this.appointmentService.getDetail(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          console.log(res.data);
          this.data = res.data;
        }
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('auth') private auth,
    @Inject('service') private serviceService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.serviceService.setServiceConfig();

  }

}

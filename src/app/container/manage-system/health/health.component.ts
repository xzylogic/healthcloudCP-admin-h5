import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html'
})
export class HealthComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('auth') private auth,
    @Inject('health') private healthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.healthService.setHealthConfig();
  }

}

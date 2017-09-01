import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-planned-immunity-plan',
  templateUrl: './plan.component.html'
})
export class PlanComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('plan') private planService) {
  }

  ngOnInit() {
    this.containerConfig = this.planService.setPlanConfig();
  }
}

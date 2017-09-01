import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('organization') private organizationService) {
  }

  ngOnInit() {
    this.containerConfig = this.organizationService.setOrganizationConfig();
  }
}

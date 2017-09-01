import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('role') private roleService) {
  }

  ngOnInit() {
    this.containerConfig = this.roleService.setRoleConfig();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../../_store/main.state';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html'
})
export class RoleEditComponent implements OnInit {
  @select(['main', 'navTree']) readonly navTree: Observable<Menu[]>;
  containerConfig: ContainerConfig;
  form: any;
  errMsg = '';

  constructor(
    @Inject('role') private roleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.navTree.subscribe(menu => {
        console.log(menu);
        if (params.id) {

        } else {
          this.containerConfig = this.roleService.setRoleEditConfig(false);
          this.form = this.roleService.setRoleForm(menu);
        }
      });
    });
  }

  getValue(data) {
    console.log(data);
  }
}

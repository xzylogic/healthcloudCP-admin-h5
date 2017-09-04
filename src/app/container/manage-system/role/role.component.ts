import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  containerConfig: ContainerConfig;
  roleTable: TableOption;

  constructor(
    @Inject('role') private roleService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.roleService.setRoleConfig();
    this.roleTable = new TableOption({
      titles: this.roleService.setRoleTitles(),
      ifPage: false
    });
    this.reset();
  }

  reset() {
    this.roleTable.queryKey = '';
    this.getRoles();
  }

  getRoles() {
    this.roleTable.reset();
    this.roleService.getRoles(this.roleTable.queryKey)
      .subscribe(res => {
        this.roleTable.loading = false;
        if (res.code === 0 && res.data) {
          this.formatData(res.data);
          this.roleTable.lists = res.data;
          console.log(this.roleTable.lists);
        } else {
          console.log(res);
        }
      }, err => {
        this.roleTable.loading = false;
        console.log(err);
      });
  }

  gotoHandle(res) {
    console.log(res);
  }

  newData() {
    console.log('new data');
    this.router.navigate(['/role/edit']);
  }

  formatData(data) {
    data.forEach(obj => {
      if (obj.del_flag == 0) {
        obj.enable = '启用';
        obj.enableButton = '禁用';
      }
    });
  }
}

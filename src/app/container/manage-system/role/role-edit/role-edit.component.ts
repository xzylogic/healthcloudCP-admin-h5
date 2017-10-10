import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../../_store/main.state';
import { MdDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html'
})
export class RoleEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: any;
  errMsg = '';
  id: any;

  constructor(
    @Inject('role') private roleService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roleService.getMenu().subscribe(res => {
        if (res.code === 0 && res.data) {
          if (params.id) {
            this.id = params.id;
            this.containerConfig = this.roleService.setRoleEditConfig(true);
            this.getInit(params.id);
          } else {
            this.containerConfig = this.roleService.setRoleEditConfig(false);
            this.form = this.roleService.setRoleForm(res.data);
          }
        }
      });
    });
  }

  getInit(id) {
    this.roleService.getRole(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.roleService.setRoleForm(res.data.menuTree, res.data.roleName);
        } else {
          HintDialog('初始化数据失败，请刷新重试！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('初始化数据失败，请刷新重试！', this.dialog);
      });
  }

  getValue(data) {
    if (this.id) {
      data.roleId = this.id;
    }
    data.delFlag = 0;
    data.menuIds = data.menuIds.join(',');
    this.roleService.updateRole(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/role']);
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}

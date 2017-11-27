import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeDialog: any;
  subscribeHDialog: any;
  subscribeDel: any;

  containerConfig: ContainerConfig;
  roleTable: TableOption;

  constructor(
    @Inject('auth') private auth,
    @Inject('role') private roleService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
        this.roleTable = new TableOption({
          titles: this.roleService.setRoleTitles(true),
          // titles: this.roleService.setRoleTitles(this.permission),
          ifPage: false
        });
      }
    });
    this.containerConfig = this.roleService.setRoleConfig();
    this.reset();
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeHDialog) {
      this.subscribeHDialog.unsubscribe();
    }
    if (this.subscribeDel) {
      this.subscribeDel.unsubscribe();
    }
  }

  reset() {
    this.roleTable.queryKey = '';
    this.getRoles();
  }

  getRoles() {
    this.roleTable.reset();
    this.subscribeData = this.roleService.getRoles(this.roleTable.queryKey)
      .subscribe(res => {
        this.roleTable.loading = false;
        if (res.code === 0 && res.data) {
          this.roleTable.lists = res.data;
        } else {
          this.roleTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.roleTable.loading = false;
        this.roleTable.errorMessage = ERRMSG.netErrMsg;
        console.log(err);
      });
  }

  gotoHandle(res) {
    if (res.key === 'edit' && res.value) {
      this.router.navigate(['/role', this.paramsMenu, 'edit'], {queryParams: {id: res.value.roleId}});
    }
    if (res.key === 'delFlag' && res.value) {
      this.subscribeHDialog = HintDialog(
        `你确定要${res.value.delFlag == 0 ? '禁用' : '启用'}角色：${res.value.name}？`,
        this.dialog
      ).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.enableMenu(res.value.roleId, res.value.delFlag);
        }
      });
    }
  }

  newData() {
    this.router.navigate(['/role', this.paramsMenu, 'edit']);
  }

  enableMenu(id, flag) {
    this.subscribeDel = this.roleService.enableRole(id, flag == 0 ? 1 : 0, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '操作成功！', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}

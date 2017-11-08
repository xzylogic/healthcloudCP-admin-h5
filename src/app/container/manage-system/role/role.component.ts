import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  containerConfig: ContainerConfig;
  roleTable: TableOption;

  constructor(
    @Inject('role') private roleService,
    private dialog: MatDialog,
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
      this.router.navigate(['/role/edit'], {queryParams: {id: res.value.roleId}});
    }
    if (res.key === 'enableButton' && res.value) {
      HintDialog(`你确定要${res.value.enableButton}角色：${res.value.name}？`, this.dialog).afterClosed()
        .subscribe(result => {
          if (result && result.key === 'confirm') {
            this.enableMenu(res.value.roleId, res.value.delFlag);
          }
        });
    }
  }

  newData() {
    this.router.navigate(['/role/edit']);
  }

  enableMenu(id, flag) {
    this.roleService.enableRole(id, flag == 0 ? 1 : 0)
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

  formatData(data) {
    data.forEach(obj => {
      if (obj.delFlag == 0) {
        obj.enable = '启用';
        obj.enableButton = '禁用';
      } else if (obj.delFlag == 1) {
        obj.enable = '禁用';
        obj.enableButton = '启用';
      }
    });
  }
}

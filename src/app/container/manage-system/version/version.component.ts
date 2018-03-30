import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  permission = false;
  formIOS: any;
  formAndroid: any;

  hintDialog: any;

  constructor(
    @Inject('auth') private auth,
    @Inject('version') private versionService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.versionService.setVersionConfig();
    this.route.params.subscribe(route => {
      if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
        this.permission = true;
      }
      this.formIOS = this.versionService.setVersionForm(null, !this.permission);
      this.formAndroid = this.versionService.setVersionForm(null, !this.permission);
    });
  }

  ngOnDestroy() {
    if (this.hintDialog) {
      this.hintDialog.unsubscribe();
    }
  }

  getValues(data, type) {
    this.hintDialog = HintDialog('是否保存版本信息？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key == 'confirm') {
          this.versionService.saveVersion(data, type).subscribe(res => {
            if (res.code == 0) {
              HintDialog(res.msg || '保存成功！', this.dialog);
            } else {
              HintDialog(res.msg || '保存失败！', this.dialog);
            }
          }, err => {
            HintDialog('网络链接失败，请重试！', this.dialog);
            throw new Error(err);
          });
        }
      });
  }
}

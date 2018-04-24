import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html'
})
export class ShareComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  permission = false;
  form: any;

  hintDialog: any;

  constructor(
    @Inject('auth') private auth,
    @Inject('share') private shareService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.shareService.setShareConfig();
    this.route.params.subscribe(route => {
      if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
        this.permission = true;
      }
      this.form = this.shareService.setShareForm(null, !this.permission);
    });
  }

  ngOnDestroy() {
    if (this.hintDialog) {
      this.hintDialog.unsubscribe();
    }
  }

  getValues(data) {
    this.hintDialog = HintDialog('是否保存版本信息？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key == 'confirm') {
          console.log(data);
          // this.shareService.saveShare(data).subscribe(res => {
          //   if (res.code == 0) {
          //     HintDialog(res.msg || '保存成功！', this.dialog);
          //   } else {
          //     HintDialog(res.msg || '保存失败！', this.dialog);
          //   }
          // }, err => {
          //   HintDialog('网络链接失败，请重试！', this.dialog);
          //   throw new Error(err);
          // });
        }
      });
  }
}

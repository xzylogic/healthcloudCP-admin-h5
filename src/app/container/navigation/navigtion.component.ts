import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Menu } from '../_store/main.state';
import { DialogEdit } from '../../libs/dmodal/dialog.entity';
import { FormText } from '../../libs/dform/_entity/form-text';
import { EditDialog } from '../../libs/dmodal/dialog-edit.component';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @select(['main', 'adminName']) readonly username: Observable<string>;
  @select(['main', 'navigation']) readonly navigation: Observable<Menu[]>;
  subscribeDialog: any;
  subscribeUpdate: any;

  constructor(
    @Inject('app') public app,
    @Inject('nav') private navService,
    @Inject('auth') private authService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.initSidebars();
  }

  initSidebars() {
    const path = window.location.pathname;
    this.navService.initSidebars(path);
  }

  toggleSub(sidebar) {
    sidebar.open = !sidebar.open;
  }

  logout() {
    this.authService.logout();
  }

  changePwd() {
    const config: DialogEdit = new DialogEdit({
      title: `修改密码`,
      form: [new FormText({
        key: 'password',
        label: '密码',
        value: '',
        type: 'password',
        required: true,
        order: 1
      })]
    });
    this.subscribeDialog = EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result) {
        this.updatePassword(result);
      }
    });
  }

  updatePassword(data) {
    this.subscribeDialog.unsubscribe();
    this.subscribeUpdate = this.authService.updatePassword(data)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog('修改密码成功!', this.dialog).afterClosed().subscribe(() => {
            this.authService.logout();
          });
        } else {
          this.subscribeDialog = HintDialog(res.msg || '修改密码失败~', this.dialog);
        }
      }, err => {
        console.log(err);
        this.subscribeDialog = HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  ngOnDestroy() {
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeUpdate) {
      this.subscribeUpdate.unsubscribe();
    }
    console.log('navigation destroy');
  }
}

import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
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
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @select(['main', 'adminName']) readonly username: Observable<string>;
  @select(['main', 'navigation']) readonly navigation: Observable<Menu[]>;

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

  ngAfterViewInit() {
    // const container = document.getElementById('container');
    // Ps.initialize(container, {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   suppressScrollX: true
    // });
    // Ps.update(container);
  }

  initSidebars() {
    const path = window.location.pathname.split('/')[1];
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
    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result) {
        this.updatePassword(result);
      }
    });
  }

  updatePassword(data) {
    this.authService.updatePassword(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('修改密码成功!', this.dialog).afterClosed().subscribe(() => {
            this.authService.logout();
          });
        } else {
          HintDialog(res.msg || '修改密码失败~', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  ngOnDestroy() {
    console.log('destroy navigation');
  }
}

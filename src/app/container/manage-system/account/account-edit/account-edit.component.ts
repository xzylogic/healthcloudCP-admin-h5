import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  id: any;

  subscribeRoute: any;
  subscribeSave: any;
  subscribeDetail: any;
  subscribeDialog: any;
  subscribeSearch: any;

  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;

  config: any;
  roleList: any[] = [];
  menuList: any;
  menuId: any;
  loginname: string;
  valid: boolean;

  constructor(
    @Inject('account') private accountService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query) => ({route, query})
    ).subscribe(res => {
      if (res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.accountService.setAccountEditConfig(true);
        this.getInit(res.query.id);
      } else {
        this.containerConfig = this.accountService.setAccountEditConfig(false);
        this.config = this.accountService.setAccountForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
        this.getCommunity();
      }
    });
    this.subscribeSearch = this.searchStream.debounceTime(500).distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(searchText);
      });
    this.getRole();
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeSearch) {
      this.subscribeSearch.unsubscribe();
    }
  }

  getInit(id) {
    this.subscribeDetail = this.accountService.getAccount(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          res.data.roleId = res.data.roleList[0] && res.data.roleList[0].roleId || '';
          this.menuId = res.data.menuId;
          this.loginname = res.data.loginname;
          this.valid = true;
          this.config = this.accountService.setAccountForm(res.data);
          this.form = this.fcs.toFormGroup(this.config);
          this.cdr.detectChanges();
          this.getCommunity();
        }
      });
  }

  getValues(data) {
    if (this.valid) {
      const value: any = {};
      value.username = data.username;
      value.loginname = data.loginname;
      value.telephone = data.telephone;
      value.personCard = data.personCard;
      value.delFlag = data.delFlag;
      const roleId = data.roleId;
      const menuId = data.menuId;
      if (this.id) {
        value.userId = this.id;
      }
      this.subscribeSave = this.accountService.updateAccount(value, roleId, menuId, this.paramsMenu)
        .subscribe(res => {
          if (res.code === 0) {
            this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
              .afterClosed().subscribe(() => {
                this.router.navigate(['/account', this.paramsMenu]);
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

  toggle(data) {
    data.open = !data.open;
  }

  offData(data) {
    if (data) {
      data.open = false;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.offData(obj);
        });
      }
    }
  }

  openData(data) {
    if (data) {
      data.open = true;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.openData(obj);
        });
      }
    }
  }

  selectMenu(data) {
    this.unActive(this.menuList, data.menuId);
    this.config[3].value = data.menuId;
    this.cdr.detectChanges();
  }

  unActive(data, id) {
    if (data) {
      data.active = data.menuId === id;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.unActive(obj, id);
        });
      }
    }
  }

  getValidName(name) {
    this.searchStream.next(name);
  }

  loadData(data) {
    this.accountService.getValid(data, this.id || '')
      .subscribe(res => {
        this.valid = res.code !== 1000;
      });
  }

  getRole() {
    this.accountService.getRole()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.roleList = res.data;
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  getCommunity() {
    this.accountService.getCommunity()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.menuList = res.data;
          this.offData(this.menuList);
          if (this.menuId) {
            this.unActive(this.menuList, this.menuId);
            const tag = this.getTree(this.menuList, this.menuId);
            this.openTree(this.menuList, tag);
          }
          // console.log(this.menuList);
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  formatMenu(menus) {
    return menus.filter(menu => menu.type !== '3');
  }

  ifChildren(children) {
    let flat = false;
    if (children && Array.isArray(children)) {
      children.forEach(child => {
        if (child.type !== '3') {
          flat = true;
        }
      });
    }
    return flat;
  }

  resetPwd() {
    HintDialog('确定要初始化密码？初始化后密码为：123456。', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.accountService.resetPwd(this.id, this.paramsMenu)
            .subscribe(res => {
              if (res.code === 0) {
                HintDialog('初始化密码成功！', this.dialog);
              } else {
                HintDialog(res.msg || '初始化密码失败！', this.dialog);
              }
            }, err => {
              console.log(err);
              HintDialog(ERRMSG.saveError, this.dialog);
            });
        }
      });
  }

  getTree(tree, id): { one?: string, two?: string, three?: string } {
    const tag = {one: '', two: '', three: ''};
    let one = '';
    let two = '';
    let three = '';
    if (tree.menuId !== id && tree.children) {
      tag.one = tree.menuId;
      tree.children.forEach(obj => {
        if (obj.menuId === id) {
          one = tag.one;
        } else if (obj.menuId !== id && obj.children) {
          tag.two = obj.menuId;
          obj.children.forEach(sobj => {
            if (sobj.menuId === id) {
              one = tag.one;
              two = tag.two;
            } else if (sobj.menuId !== id && sobj.children) {
              tag.three = sobj.menuId;
              sobj.children.forEach(ssobj => {
                if (ssobj.menuId === id) {
                  one = tag.one;
                  two = tag.two;
                  three = tag.three;
                }
              });
            }
          });
        }
      });
    }
    return {one: one, two: two, three: three};
  }

  openTree(tree, tag: { one?: string, two?: string, three?: string }) {
    if (tree.menuId === tag.one) {
      tree.open = true;
    }
    if (tree.children) {
      tree.children.forEach(obj => {
          if (obj.menuId === tag.two) {
            obj.open = true;
          }
          if (obj.children) {
            obj.children.forEach(sobj => {
              if (sobj.menuId === tag.three) {
                sobj.open = true;
              }
            });
          }
        }
      );
    }
  }
}

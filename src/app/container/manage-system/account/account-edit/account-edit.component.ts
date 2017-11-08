import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;
  config: any;
  roleList: any[] = [];
  menuList: any;
  id: any;
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
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.containerConfig = this.accountService.setAccountEditConfig(true);
        this.getInit(params.id);
      } else {
        this.containerConfig = this.accountService.setAccountEditConfig(false);
        this.config = this.accountService.setAccountForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
        this.getCommunity();
      }
    });
    this.searchStream.debounceTime(500).distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(searchText);
      });
    this.getRole();
  }

  getInit(id) {
    this.accountService.getAccount(id)
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
      value.delFlag = data.delFlag;
      const roleId = data.roleId;
      const menuId = data.menuId;
      if (this.id) {
        value.userId = this.id;
      }
      this.accountService.updateAccount(value, roleId, menuId)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/account']);
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
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  resetPwd() {
    HintDialog('确定要初始化密码？初始化后密码为：123456。', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.accountService.resetPwd(this.id)
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

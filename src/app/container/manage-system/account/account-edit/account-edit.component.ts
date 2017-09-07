import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
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
    private dialog: MdDialog,
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
    console.log(data);
    if (this.valid) {
      const value = data;
      const roleId = value.roleId;
      const menuId = value.menuId;
      delete value.roleId;
      delete value.menuId;
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
    console.log(data);
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
    this.accountService.getValid(data)
      .subscribe(res => {
        console.log(res);
        this.valid = (res.code !== 1000) || (this.loginname === data);
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
          }
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  resetPwd() {
    console.log(this.id);
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
}

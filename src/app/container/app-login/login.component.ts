import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { FormText } from '../../libs/dform/_entity/form-text';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscribeUpdate: any;
  loginForm: FormGroup;
  loginLib: FormText[];
  date = new Date();
  errorMsg = '';

  constructor(
    @Inject('app') public app,
    @Inject('main') private mainAction,
    @Inject('auth') private authService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscribeUpdate) {
      this.subscribeUpdate.unsubscribe();
    }
    this.loginForm = null;
    this.loginLib = null;
  }

  createForm() {
    this.loginForm = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      password: new FormControl({value: ''}, Validators.required)
    });
    this.loginLib = [
      new FormText({
        type: 'text',
        label: '用户名',
        key: 'name',
        value: ''
      }),
      new FormText({
        type: 'password',
        label: '密码',
        key: 'password',
        value: ''
      })
    ];
  }

  onSubmit(value) {
    if (value.name && value.password) {
      this.subscribeUpdate = this.authService.login(value)
        .subscribe(res => {
          if (res && res.code === 0 && res.data) {
            this.authService.setLocal(res.data);
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.errorMsg = res.msg || ERRMSG.loginErr;
            HintDialog(this.errorMsg, this.dialog);
          }
        }, err => {
          console.log(err);
          this.errorMsg = ERRMSG.netErrMsg;
          HintDialog(this.errorMsg, this.dialog);
        });
    }
  }
}

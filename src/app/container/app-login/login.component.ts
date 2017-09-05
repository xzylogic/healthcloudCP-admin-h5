import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { FormText } from '../../libs/dform/_entity/form-text';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { Admin } from '../_store/main.state';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginLib: FormText[];
  date = new Date();
  errorMsg = '';

  constructor(
    @Inject('app') private app,
    @Inject('main') private mainAction,
    @Inject('auth') private authService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
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
      this.authService.login(value)
        .subscribe(res => {
          console.log(res);
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

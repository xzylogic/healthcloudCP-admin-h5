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
          if (res && res.code === 0 && res.data) {
            this.authService.setJwt(JSON.stringify(res.data));
            this.mainAction.setAdmin(new Admin({id: res.data.id, name: res.data.name}));
            this.mainAction.setTree({
              'menuId': '1',
              'menuName': '昌平健康云标准版',
              'children': [
                {
                  'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                  'menuName': '叶酸领取预约',
                  'parentId': '1',
                  'href': 'test-test',
                  'children': [
                    {
                      'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                      'menuName': '预约信息查询',
                      'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                      'href': 'test-test',
                      'checked': false
                    },
                    {
                      'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                      'menuName': '排班以及号源维护',
                      'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                      'href': 'test-test',
                      'checked': false
                    }
                  ],
                  'checked': false
                },
                {
                  'menuId': '6f23805d6859481fa3298b4a6f080df6',
                  'menuName': '系统管理',
                  'parentId': '1',
                  'href': 'Test-test',
                  'children': [
                    {
                      'menuId': '40a196b09c054f6db0efab7b925fe25b',
                      'menuName': '菜单管理',
                      'parentId': '6f23805d6859481fa3298b4a6f080df6',
                      'href': 'Test-test',
                      'checked': false
                    }
                  ],
                  'checked': false
                }
              ],
              'checked': false
            });
            this.mainAction.setNav([
              {
                'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                'menuName': '系统管理',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '菜单管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/menu',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '医院机构管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/organization',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '角色管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/role',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '账号管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/account',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                'menuName': '叶酸领取预约',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '排号及号源管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/receive-folic-acid/plan',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '预约信息查询',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/receive-folic-acid/appointment',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                'menuName': '母子建档预约',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '排号及号源管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/mac-database/plan',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '预约信息查询',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/mac-database/appointment',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                'menuName': '计划免疫预约',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '排号及号源管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/planned-immunity/plan',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '预约信息查询',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/planned-immunity/appointment',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '08f204a024844f29b60ff0e11d39ab8e',
                'menuName': '儿童体检预约',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '排号及号源管理',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/pe-for-children/plan',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '医院机构管理',
                    'parentId': '预约信息查询',
                    'href': '/pe-for-children/appointment',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '6f23805d6859481fa3298b4a6f080df6',
                'menuName': '资讯管理',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': '文章库',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/article',
                    'checked': false
                  },
                  {
                    'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                    'menuName': '资讯分类',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/article-classify',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '6f23805d6859481fa3298b4a6f080df6',
                'menuName': '广告管理',
                'parentId': '1',
                'href': '/',
                'children': [
                  {
                    'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                    'menuName': 'banner设置',
                    'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                    'href': '/banner',
                    'checked': false
                  }
                ],
                'checked': false
              },
              {
                'menuId': '6f23805d6859481fa3298b4a6f080df6',
                'menuName': '消息',
                'parentId': '1',
                'href': '/message',
                'children': [],
                'checked': false
              },
              {
                'menuId': '6f23805d6859481fa3298b4a6f080df6',
                'menuName': '建议反馈',
                'parentId': '1',
                'href': '/feedback',
                'children': [],
                'checked': false
              }
            ]);
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

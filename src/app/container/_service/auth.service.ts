import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../_store/main.state';
import * as md5 from 'md5';

declare let require;
const Base64 = require('js-base64').Base64;
const isJSON = require('is-json');

const PATH = {
  login: '/api/login', // 登陆
  logout: '/api/logout', // 退出
  updatePassword: '/api/basicInfo/user/updatePassword', // 修改密码
};

@Injectable()
export class AuthService {
  JWT_KEY = 'JKY_BJ_CP';
  // store the URL so we can redirect after logging in
  redirectUrl = '';
  @select(['main', 'adminName']) adminName: Observable<string>;
  @select(['main', 'adminId']) adminId: Observable<number>;

  constructor(
    private router: Router,
    @Inject('app') public app,
    @Inject('http') public httpService,
    @Inject('main') public mainAction
  ) {
  }

  setJwt(jwt: string) {
    window.sessionStorage.setItem(this.JWT_KEY, jwt);
  }

  login(creds) {
    return this.httpService.post(`${this.app.api_url}${PATH.login}?username=${creds.name}&password=${creds.password}`, {});
  }

  logout() {
    window.sessionStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['/login']);
    this.redirectUrl = '';
    this.mainAction.delAdmin();
    this.httpService.get(`${this.app.api_url}${PATH.logout}`)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  isAuthorized(): boolean {
    const admin = window.sessionStorage.getItem(this.JWT_KEY);
    if (admin) {
      this.setLocalJWT(JSON.parse(admin));
    }
    return Boolean(admin);
  }

  setLocal(data) {
    const secretData: any = {};
    secretData[md5('sessionId')] = Base64.encode(data.sessionId);
    secretData[md5('userId')] = Base64.encode(data.userId);
    secretData[md5('userName')] = Base64.encode(data.userName);
    secretData[md5('menu')] = Base64.encode(JSON.stringify(data.menu));
    this.setJwt(JSON.stringify(secretData));
    this.mainAction.setAdmin(new Admin({id: data.userId, name: data.userName}));
    this.mainAction.setTree(data.menu || {});
    this.mainAction.setNav(data.menu && data.menu.children || []);
    this.httpService.setHeaders({'sessionId': data.sessionId, 'userId': data.userId});
  }

  setLocalJWT(data) {
    const secretData = data;
    this.mainAction.setAdmin(
      new Admin({
        id: Base64.decode(secretData[md5('userId')]),
        name: Base64.decode(secretData[md5('userName')])
      })
    );
    if (Base64.decode(secretData[md5('menu')]) && isJSON(Base64.decode(secretData[md5('menu')]))) {
      this.mainAction.setTree(JSON.parse(Base64.decode(secretData[md5('menu')])));
      this.mainAction.setNav(JSON.parse(Base64.decode(secretData[md5('menu')])).children);
    } else {
      this.mainAction.setTree({});
      this.mainAction.setNav([]);
    }
    this.httpService.setHeaders({
      'sessionId': Base64.decode(data[md5('sessionId')]),
      'userId': Base64.decode(data[md5('userId')])
    });
  }

  updatePassword(data) {
    data.userId = this.getAdminId();
    return this.httpService.post(`${this.app.api_url}${PATH.updatePassword}`, data);
  }

  getAdminName(): string {
    let name: string;
    this.adminName.subscribe(res => {
      name = res;
    });
    return name;
  }

  getAdminId(): number {
    let id: number;
    this.adminId.subscribe(res => {
      id = res;
    });
    return id;
  }
}

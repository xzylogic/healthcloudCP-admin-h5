import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../_store/main.state';

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
      this.setLocal(JSON.parse(admin));
    }
    return Boolean(admin);
  }

  setLocal(data) {
    this.setJwt(JSON.stringify(data));
    this.mainAction.setAdmin(new Admin({id: data.userId, name: data.userName}));
    this.mainAction.setTree(data.menu || {});
    this.mainAction.setNav(data.menu && data.menu.children || []);
    this.httpService.setHeaders({'sessionId': data.sessionId});
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

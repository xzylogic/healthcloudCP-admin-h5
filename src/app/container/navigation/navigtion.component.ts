import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { Menu } from '../_store/main.state';

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
    @Inject('auth') private authService
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
    // this.setCount();
  }

  toggleSub(sidebar) {
    sidebar.open = !sidebar.open;
  }

  logout() {
    this.authService.logout();
  }

  changePwd() {
    console.log('change password');
  }

  ngOnDestroy() {
    console.log('destroy navigation');
  }

}

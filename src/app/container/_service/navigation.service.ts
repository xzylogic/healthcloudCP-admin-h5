import { Injectable, Inject } from '@angular/core';

const PATH = {
  count: 'opt/config/count'
};

@Injectable()
export class NavigationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('main') private mainAction
  ) {
  }

  initSidebars(path) {
    this.mainAction.initNav({path: path});
  }
}

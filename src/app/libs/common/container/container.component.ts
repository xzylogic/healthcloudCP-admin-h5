import { Component, Input } from '@angular/core';

export class ContainerConfig {
  title: string;
  subTitle: string;
  ifHome: boolean;
  homeRouter: string;
  query?: any;

  constructor(obj?: ContainerConfig) {
    this.title = obj && obj.title || '';
    this.subTitle = obj && obj.subTitle || '';
    this.ifHome = obj && !!obj.ifHome;
    this.homeRouter = obj && obj.homeRouter || '';
    this.query = obj && obj.query || {};
  }
}

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() config: ContainerConfig;

  back() {
    history.go(-1);
  }
}

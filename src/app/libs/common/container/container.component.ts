import { Component, Input } from '@angular/core';

export class ContainerConfig {
  title: string; // 主标题
  subTitle: string; // 副标题
  ifHome: boolean; // 是否为主页
  homeRouter: any; // 主页路由
  back?: boolean; // 是否可返回
  query?: any; // 是否带查询条件

  constructor(obj?: ContainerConfig) {
    this.title = obj && obj.title || '';
    this.subTitle = obj && obj.subTitle || '';
    this.ifHome = obj && !!obj.ifHome;
    this.homeRouter = obj && obj.homeRouter || '';
    this.query = obj && obj.query || {};
    this.back = obj && obj.back || false;
  }
}

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() config: ContainerConfig;

  /**
   * 返回上级菜单
   */
  back() {
    history.go(-1);
  }
}

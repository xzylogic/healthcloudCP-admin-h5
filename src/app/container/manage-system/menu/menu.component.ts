import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('menu') private menuService) {
  }

  ngOnInit() {
    this.containerConfig = this.menuService.setMenuConfig();
  }
}

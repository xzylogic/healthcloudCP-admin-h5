import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('account') private accountService) {
  }

  ngOnInit() {
    this.containerConfig = this.accountService.setAccountConfig();
  }
}

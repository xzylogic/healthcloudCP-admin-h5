import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  containerConfig: ContainerConfig;
  accountTable: TableOption;
  username: string;
  telephone: string;

  constructor(
    @Inject('account') private accountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.accountService.setAccountConfig();
    this.accountTable = new TableOption({
      titles: this.accountService.setAccountTitles(),
      ifPage: true
    });
    this.getAccounts(0);
  }

  search() {
    console.log(this.username);
    console.log(this.telephone);
  }

  reset() {
    this.getAccounts(0);
  }

  getAccounts(page: number) {
    this.accountTable.reset(page);
    this.accountService.getAccounts(page + 1)
      .subscribe(res => {
        console.log(res);
        this.accountTable.loading = false;
        if (res.code === 0 && res.data && res.data.data && res.data.data.length === 0) {
          this.accountTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.data) {
          this.accountTable.totalPage = res.data.total_pages;
          this.accountTable.lists = res.data.data;
          this.formatData(this.accountTable.lists);
        } else {
          this.accountTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.accountTable.loading = false;
        console.log(err);
        this.accountTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    if (res.key === 'edit' && res.value.userId) {
      this.router.navigate(['/account/edit'], {queryParams: {id: res.value.userId}});
    }
  }

  newData() {
    this.router.navigate(['/account/edit']);
  }

  formatData(data) {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        obj.roleName = obj.roleList[0] && obj.roleList[0].name || '';
      });
    }
  }
}

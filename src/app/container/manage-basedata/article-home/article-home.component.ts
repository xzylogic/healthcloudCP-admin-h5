import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html'
})
export class ArticleHomeComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeHDialog: any;
  subscribeDel: any;

  containerConfig: ContainerConfig;
  homeArticleTable: TableOption;

  title = '';
  status = '';

  statusList = [{
    id: '',
    name: '全部'
  }, {
    id: '1',
    name: '未开始'
  }, {
    id: '2',
    name: '进行中'
  }, {
    id: '3',
    name: '已结束'
  }];

  constructor(
    @Inject('auth') private auth,
    @Inject('home') private homeService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
        this.homeArticleTable = new TableOption({
          titles: this.homeService.setArticleHomeTable(this.permission),
          ifPage: true
        });
      }
    });
    this.containerConfig = this.homeService.setArticleHomeConfig();
    this.reset();
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    if (this.subscribeHDialog) {
      this.subscribeHDialog.unsubscribe();
    }
    if (this.subscribeDel) {
      this.subscribeDel.unsubscribe();
    }
  }

  reset() {
    this.title = '';
    this.status = '';
    this.getHomeArticles(0);
  }

  getHomeArticles(page) {
    this.homeArticleTable.reset(page);
    this.subscribeData = this.homeService.getHomeArticles(page, this.homeArticleTable.size, this.title, this.status)
      .subscribe(res => {
        this.homeArticleTable.loading = false;
        if (res.data) {
          this.homeArticleTable.totalPage = res.totalPages;
          this.homeArticleTable.lists = res.data;
        } else {
          this.homeArticleTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.homeArticleTable.loading = false;
        this.homeArticleTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.router.navigate(['/article-home', this.paramsMenu, 'edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'isVisable') {
      this.subscribeHDialog = HintDialog(`你确定要${data.value.isVisable == 0 ? '下线' : '上线'}${data.value.title}？`, this.dialog)
        .afterClosed().subscribe(res => {
          if (res && res.key === 'confirm') {
            this.changeStatus(data.value);
          }
        });
    }
  }

  changeStatus(data) {
    this.subscribeDel = this.homeService.changeStatus(data.id, data.isVisable == 0 ? 1 : 0, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  newData() {
    this.router.navigate(['/article-home', this.paramsMenu, 'edit']);
  }
}

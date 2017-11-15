import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-article-classify',
  templateUrl: './article-classify.component.html'
})
export class ArticleClassifyComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeHDialog: any;
  subscribeDel: any;

  containerConfig: ContainerConfig;
  classifyTable: TableOption;

  constructor(
    @Inject('auth') private auth,
    @Inject('classify') private classifyService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
        this.classifyTable = new TableOption({
          titles: this.classifyService.setArticleClassifyTable(this.permission),
          ifPage: false
        });
      }
    });
    this.containerConfig = this.classifyService.setArticleClassifyConfig();
    this.getClassifies();
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

  getClassifies() {
    this.classifyTable.reset();
    this.subscribeData = this.classifyService.getClassifies()
      .subscribe(res => {
        this.classifyTable.loading = false;
        if (res.code === 0 && res.data) {
          this.classifyTable.lists = res.data;
        } else {
          this.classifyTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.classifyTable.loading = false;
        this.classifyTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.router.navigate(['/article-classify', this.paramsMenu, 'edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'isVisable') {
      this.subscribeHDialog = HintDialog(
        `你确定要${data.value.isVisable == 0 ? '禁用' : '启用'}资讯分类：${data.value.categoryName}？`,
        this.dialog
      ).afterClosed().subscribe(res => {
        if (res && res.key === 'confirm') {
          this.delClassify(data.value);
        }
      });
    }
  }

  newData() {
    this.router.navigate(['/article-classify', this.paramsMenu, 'edit']);
  }

  delClassify(data) {
    this.subscribeDel = this.classifyService.delClassify(data.id, data.isVisable == 0 ? 1 : 0, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog);
          this.getClassifies();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}

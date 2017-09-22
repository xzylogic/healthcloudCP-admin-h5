import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-article-classify',
  templateUrl: './article-classify.component.html'
})
export class ArticleClassifyComponent implements OnInit {
  containerConfig: ContainerConfig;
  classifyTable: TableOption;

  constructor(
    @Inject('classify') private classifyService,
    private router: Router,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.classifyService.setArticleClassifyConfig();
    this.classifyTable = new TableOption({
      titles: this.classifyService.setArticleClassifyTable(),
      ifPage: false
    });
    this.getClassifies();
  }

  getClassifies() {
    this.classifyTable.reset();
    this.classifyService.getClassifies()
      .subscribe(res => {
        this.classifyTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.classifyTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.formatData(res.data);
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
      this.router.navigate(['/article-classify/edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'statusName') {
      HintDialog(`你确定要${data.value.statusName}资讯分类：${data.value.categoryName}？`, this.dialog)
        .afterClosed().subscribe(res => {
        if (res && res.key === 'confirm') {
          this.delClassify(data.value);
        }
      });
    }
  }

  newData() {
    this.router.navigate(['/article-classify/edit']);
  }

  delClassify(data) {
    this.classifyService.delClassify(data.id, data.isVisable == 0 ? 1 : 0)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getClassifies();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  formatData(list) {
    if (list && Array.isArray(list)) {
      list.forEach(obj => {
        obj.status = obj.isVisable == 1 ? '禁用' : '启用';
        obj.statusName = obj.isVisable == 1 ? '启用' : '禁用';
      });
    }
  }
}

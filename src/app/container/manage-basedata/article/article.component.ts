import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  containerConfig: ContainerConfig;
  articleTable: TableOption;
  title = '';
  queryTime = '';
  endTime = '';
  classifyId = '';
  classifyList: any;

  constructor(
    @Inject('article') private articleService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.articleService.setArticleConfig();
    this.articleTable = new TableOption({
      titles: this.articleService.setArticleTable(),
      ifPage: true
    });
    this.getClassifyList();
    this.reset();
  }

  reset() {
    this.title = '';
    this.queryTime = '';
    this.endTime = '';
    this.classifyId = '';
    this.getArticles(0);
  }

  getArticles(page) {
    this.articleTable.reset(page);
    this.articleService.getArticles(
      page, this.articleTable.size,
      this.title,
      this.queryTime.split(' 至 ')[0] || '',
      this.queryTime.split(' 至 ')[1] || '',
      this.classifyId
    )
      .subscribe(res => {
        this.articleTable.loading = false;
        if (res.data && res.data.length === 0) {
          this.articleTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          this.articleTable.totalPage = res.totalPages;
          this.articleTable.lists = res.data;
        } else {
          this.articleTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.articleTable.loading = false;
        this.articleTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    console.log(data);
    if (data.key === 'edit') {
      this.router.navigate(['/article/edit'], {queryParams: {id: data.value.id}});
    }
  }

  newData() {
    this.router.navigate(['/article/edit']);
  }

  getClassifyList() {
    this.articleService.getClassifies()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.classifyList = res.data;
        }
      });
  }
}

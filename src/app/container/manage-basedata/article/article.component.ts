import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ERRMSG } from '../../_store/static';
import { ShowDetail } from './article-detail/article-detail.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  paramsSubscribe: any;
  containerConfig: ContainerConfig;
  articleTable: TableOption;
  title = '';
  queryTime = '';
  classifyId = '';
  classifyList: any;

  constructor(
    @Inject('article') private articleService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.paramsSubscribe = this.route.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
        this.containerConfig = this.articleService.setArticleConfig(route.menu);
        this.articleTable = new TableOption({
          titles: this.articleService.setArticleTable(),
          ifPage: true
        });
        this.getClassifyList();
        this.reset();
      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscribe) {
      this.paramsSubscribe.unsubscribe();
    }
  }

  reset() {
    this.title = '';
    this.queryTime = '';
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
    if (data.key === 'edit') {
      this.router.navigate(['article', this.paramsMenu, 'edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'detail') {
      this.articleService.getArticle(data.value.id)
        .subscribe(res => {
          if (res.code === 0 && res.data) {
            ShowDetail(res.data, this.dialog);
          }
        });
    }
  }

  newData() {
    this.router.navigate(['article', this.paramsMenu, 'edit']);
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

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html'
})
export class ArticleHomeComponent implements OnInit {
  containerConfig: ContainerConfig;
  homeArticleTable: TableOption;
  title = '';
  status = '';

  constructor(@Inject('home') private homeService) {
  }

  ngOnInit() {
    this.containerConfig = this.homeService.setArticleHomeConfig();
    this.homeArticleTable = new TableOption({
      titles: this.homeService.setArticleHomeTable(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.title = '';
    this.status = '';
    this.getHomeArticles(0);
  }

  getHomeArticles(page) {
    this.homeArticleTable.reset(page);
    this.homeService.getHomeArticles(page, this.homeArticleTable.size, this.title, this.status)
      .subscribe(res => {
        this.homeArticleTable.loading = false;
        if (res.data && res.data.length === 0) {
          this.homeArticleTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          console.log(res.data);
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
    console.log(data);
  }

  newData() {
    console.log('new');
  }
}

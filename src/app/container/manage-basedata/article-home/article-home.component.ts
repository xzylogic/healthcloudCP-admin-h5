import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html'
})
export class ArticleHomeComponent implements OnInit {
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
  }, {
    id: '4',
    name: '已下线'
  }];

  constructor(
    @Inject('home') private homeService,
    private dialog: MdDialog,
    private router: Router
  ) {
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
          this.formatData(res.data);
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
    if (data.key === 'edit') {
      this.router.navigate(['/article-home/edit'], {queryParams: {id: data.value.id}});
    }
  }

  newData() {
    this.router.navigate(['/article-home/edit']);
  }

  formatData(list) {
    if (Array.isArray(list)) {
      list.forEach(obj => {
        if (obj.status == 1) {
          obj.statusName = '未开始';
          obj.detail = '下线';
        }
        if (obj.status == 2) {
          obj.statusName = '进行中';
          obj.detail = '下线';
        }
        if (obj.status == 3) {
          obj.statusName = '已结束';
        }
        if (obj.status == 4) {
          obj.statusName = '已下线';
        }
        obj.recommend = obj.isRecommend == 1 ? '推荐' : '不推荐';
      });
    }
  }
}

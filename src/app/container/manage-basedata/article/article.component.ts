import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ShowDetail } from './article-detail/article-detail.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeDetail: any;
  subscribeClassify: any;

  containerConfig: ContainerConfig;
  articleTable: TableOption;

  title = ''; // 文章标题
  queryTime = ''; // 时间范围
  classifyId = ''; // 分类ID
  classifyList: any; // 文章分类列表

  constructor(
    @Inject('auth') private auth,
    @Inject('article') private articleService,
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
        this.containerConfig = this.articleService.setArticleConfig(route.menu);
        this.articleTable = new TableOption({
          titles: this.articleService.setArticleTable(this.permission),
          ifPage: true
        });
        this.reset();
      }
    });
    this.getClassifyList();
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeClassify) {
      this.subscribeClassify.unsubscribe();
    }
  }

  reset() {
    this.title = '';
    this.queryTime = '';
    this.classifyId = '';
    this.getArticles(0);
  }

  /**
   * 根据搜索条件获取文章列表
   * @param page
   */
  getArticles(page) {
    // 重置文章列表相关数据
    this.articleTable.reset(page);
    this.subscribeData = this.articleService.getArticles(
      page, this.articleTable.size,
      this.title,
      this.queryTime.split(' 至 ')[0] || '',
      this.queryTime.split(' 至 ')[1] || '',
      this.classifyId
    )
      .subscribe(res => {
        this.articleTable.loading = false;
        if (res && res.data) {
          this.articleTable.totalPage = res.totalPages || 0;
          this.articleTable.lists = res.data;
        } else {
          this.articleTable.errorMessage = res && res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.articleTable.loading = false;
        this.articleTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  /**
   * 处理 table 中的点击事件
   * key === edit 跳转到文章编辑页面【/article/:menu/edit】
   * key === detail 弹出文章详情模态框
   * @param data
   */
  gotoHandle(data) {
    if (data.key === 'edit') {
      this.router.navigate(['article', this.paramsMenu, 'edit'], {queryParams: {id: data.value.id}});
    }
    if (data.key === 'detail') {
      this.subscribeDetail = this.articleService.getArticle(data.value.id)
        .subscribe(res => {
          if (res.code === 0 && res.data) {
            ShowDetail(res.data, this.dialog);
          }
        });
    }
  }

  /**
   * 新增文章 - 跳转到【/article/:menu/edit】页面
   */
  newData() {
    this.router.navigate(['article', this.paramsMenu, 'edit']);
  }

  /**
   * 获取文章分类列表
   */
  getClassifyList() {
    this.subscribeClassify = this.articleService.getClassifies()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.classifyList = res.data;
        }
      });
  }
}

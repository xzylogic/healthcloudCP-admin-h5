import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ShowDetail } from '../article-detail/article-detail.component';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html'
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  paramsSubscribe: any;
  queryParamsSubscribe: any;
  containerConfig: ContainerConfig;
  errMsg = '';
  form: any;
  classifyList: any;
  id: any;

  constructor(
    @Inject('article') private articleService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.paramsSubscribe = this.route.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
        this.queryParamsSubscribe = this.route.queryParams.subscribe(res => {
          if (res.id) {
            this.containerConfig = this.articleService.setArticleEditConfig(true, route.menu);
          } else {
            this.containerConfig = this.articleService.setArticleEditConfig(false, route.menu);
          }
          this.id = res.id;
          this.setInit(res.id);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscribe) {
      this.paramsSubscribe.unsubscribe();
    }
  }

  setInit(id) {
    this.articleService.getClassifies()
      .subscribe(list => {
        if (list.code === 0 && list.data) {
          const data = [];
          list.data.forEach(obj => {
            data.push({
              id: obj.id,
              name: obj.categoryName
            });
          });
          this.classifyList = data;
          if (id) {
            this.getArticle(id);
          } else {
            this.form = this.articleService.setArticleForm(
              this.classifyList
            );
          }
        } else {
          this.errMsg = '获取文章分类列表数据错误，请刷新重试！';
        }
      }, err => {
        console.log(err);
        this.errMsg = '获取文章分类列表出现网络错误，请刷新重试！';
      });
  }

  getArticle(id) {
    this.articleService.getArticle(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.articleService.setArticleForm(
            this.classifyList,
            res.data
          );
        } else {
          this.errMsg = '获取文章数据错误，请刷新重试！';
        }
      }, err => {
        console.log(err);
        this.errMsg = '获取文章数据出现网络错误，请刷新重试！';
      });
  }

  getValues(data) {
    this.articleService.saveArticle(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['article', this.paramsMenu]);
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  viewArticle(data) {
    ShowDetail(data, this.dialog);
  }
}

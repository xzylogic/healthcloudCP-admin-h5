import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ShowDetail } from '../article-detail/article-detail.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html'
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  id: string;

  subscribeParams: any;
  subscribeDialog: any;
  subscribeDetail: any;
  subscribeSave: any;

  containerConfig: ContainerConfig;
  form: any;

  errMsg = '';

  constructor(
    @Inject('article') private articleService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeParams = Observable.zip(
      this.route.params, this.route.queryParams,
      this.articleService.getClassifies(),
      (route, query, list): any => ({route, query, list})
    ).subscribe((res) => {
      if (res && res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res && res.list && res.list.code == 0 && res.list.data) {
        const classifyList = this.getClassifyList(res.list.data);
        if (res.query && res.query.id) {
          this.id = res.query.id;
          this.containerConfig = this.articleService.setArticleEditConfig(true);
          this.getArticle(this.id, classifyList);
        } else {
          this.containerConfig = this.articleService.setArticleEditConfig(false);
          this.form = this.articleService.setArticleForm(classifyList);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
  }

  getClassifyList(data): Array<any> {
    const list: Array<any> = [];
    if (Array.isArray(data)) {
      data.forEach(obj => {
        list.push({
          id: obj.id,
          name: obj.categoryName
        });
      });
    }
    return list;
  }

  getArticle(id, list) {
    this.subscribeDetail = this.articleService.getArticle(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.articleService.setArticleForm(list, res.data);
        } else {
          this.errMsg = '获取文章数据错误，请刷新重试！';
        }
      }, err => {
        console.log(err);
        this.errMsg = '获取文章数据出现网络错误，请刷新重试！';
      });
  }

  /**
   * 保存文章
   * @param data
   */
  getValues(data) {
    if (data.contentType == 1 && !data.content) {
      HintDialog('请填写文章内容', this.dialog);
    } else if (data.contentType == 2 && !data.contentUrl) {
      HintDialog('请填写文章链接', this.dialog);
    } else {
      this.subscribeSave = this.articleService.saveArticle(data, this.paramsMenu)
        .subscribe(res => {
          if (res.code === 0) {
            this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
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
  }

  /**
   * 预览文章
   * @param data
   */
  viewArticle(data) {
    ShowDetail(data, this.dialog);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ShowDetail } from '../article-detail/article-detail.component';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html'
})
export class ArticleEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  errMsg = '';
  form: any;
  classifyList: any;

  constructor(
    @Inject('article') private articleService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      if (res.id) {
        this.containerConfig = this.articleService.setArticleEditConfig(true);
      } else {
        this.containerConfig = this.articleService.setArticleEditConfig(false);
      }
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
            if (res.id) {
              this.getArticle(res.id);
            } else {
              this.form = this.articleService.setArticleForm(
                this.classifyList
              );
            }
          }
        });
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
        }
      });
  }

  getValues(data) {
    this.articleService.saveArticle(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/article']);
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

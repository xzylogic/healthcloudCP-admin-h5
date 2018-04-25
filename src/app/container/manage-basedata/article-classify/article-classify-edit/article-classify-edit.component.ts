import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-article-classify-edit',
  templateUrl: './article-classify-edit.component.html'
})
export class ArticleClassifyEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;

  subscribeRoute: any;
  subscribeDetail: any;
  subscribeDialog: any;
  subscribeSave: any;

  containerConfig: ContainerConfig;
  form: any;

  constructor(
    @Inject('classify') private classifyService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query): any => ({route, query})
    ).subscribe(res => {
      if (res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res && res.query.id) {
        this.containerConfig = this.classifyService.setArticleClassifyEditConfig(true);
        this.getClassify(res.query.id);
      } else {
        this.containerConfig = this.classifyService.setArticleClassifyEditConfig(false);
        this.form = this.classifyService.setArticleClassifyForm();
      }
    });
  }

  ngOnDestroy() {
    this.form = null;
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
  }

  getClassify(id) {
    this.subscribeDetail = this.classifyService.getClassify(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.classifyService.setArticleClassifyForm(res.data);
        }
      });
  }

  getValues(data) {
    this.subscribeSave = this.classifyService.saveClassify(data, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
            .afterClosed().subscribe(() => {
              this.router.navigate(['/article-classify', this.paramsMenu]);
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

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-article-classify-edit',
  templateUrl: './article-classify-edit.component.html'
})
export class ArticleClassifyEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  routeSubscribe: any;
  detailSubscribe: any;
  saveSubscribe: any;
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
    this.routeSubscribe = this.route.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
      }
    });
    this.route.queryParams.subscribe(res => {
      if (res && res.id) {
        this.containerConfig = this.classifyService.setArticleClassifyEditConfig(true);
        this.getClassify(res.id);
      } else {
        this.containerConfig = this.classifyService.setArticleClassifyEditConfig(false);
        this.form = this.classifyService.setArticleClassifyForm();
      }
    });
  }

  ngOnDestroy() {
    this.form = null;
    if (this.routeSubscribe) {
      this.routeSubscribe.unsubscribe();
    }
    if (this.detailSubscribe) {
      this.detailSubscribe.unsubscribe();
    }
    if (this.saveSubscribe) {
      this.saveSubscribe.unsubscribe();
    }
  }

  getClassify(id) {
    this.detailSubscribe = this.classifyService.getClassify(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.classifyService.setArticleClassifyForm(res.data);
        }
      });
  }

  getValues(data) {
    this.saveSubscribe = this.classifyService.saveClassify(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
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

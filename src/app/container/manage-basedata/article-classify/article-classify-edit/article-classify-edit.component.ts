import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-article-classify-edit',
  templateUrl: './article-classify-edit.component.html'
})
export class ArticleClassifyEditComponent implements OnInit {
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

  getClassify(id) {
    this.classifyService.getClassify(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.form = this.classifyService.setArticleClassifyForm(res.data);
        }
      });
  }

  getValues(data) {
    this.classifyService.saveClassify(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/article-classify']);
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

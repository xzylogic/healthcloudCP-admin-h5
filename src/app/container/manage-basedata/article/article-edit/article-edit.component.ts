import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html'
})
export class ArticleEditComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('article') private articleService,
    private dialog: MdDialog,
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
    });
  }
}

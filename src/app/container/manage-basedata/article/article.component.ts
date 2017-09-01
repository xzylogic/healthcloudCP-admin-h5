import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('article') private articleService) {
  }

  ngOnInit() {
    this.containerConfig = this.articleService.setArticleConfig();
  }
}

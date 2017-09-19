import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

@Component({
  selector: 'app-article-home-edit',
  templateUrl: './article-home-edit.component.html'
})
export class ArticleHomeEditComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('home') private homeService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.homeService.setArticleHomeEditConfig(false);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-article-home',
  templateUrl: './article-home.component.html'
})
export class ArticleHomeComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('home') private homeService) {
  }

  ngOnInit() {
    this.containerConfig = this.homeService.setArticleHomeConfig();
  }
}

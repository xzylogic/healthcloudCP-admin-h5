import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-article-classify',
  templateUrl: './article-classify.component.html'
})
export class ArticleClassifyComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('classify') private classifyService) {
  }

  ngOnInit() {
    this.containerConfig = this.classifyService.setArticleClassifyConfig();
  }
}

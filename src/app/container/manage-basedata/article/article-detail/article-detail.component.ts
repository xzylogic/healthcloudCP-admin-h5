import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {
  option: any = {};
  @ViewChild('inner') inner: ElementRef;
  errMsg: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ArticleDetailComponent>,
    private sanitizer: DomSanitizer,
    @Inject('article') private articleService,
  ) {
    this.option.title = this.data.title || '{{ 此处为文章标题 }}';
    this.option.time = this.data.updateTime || new Date();
    this.option.content = this.data.content || '{{ 此处为文章内容 }}';
    this.option.type = this.data.contentType || '1';
    this.option.url = this.data.contentUrl || '';
  }

  ngOnInit() {
    if (this.option.url) {
      this.articleService.getUrlContent(this.option.url)
        .subscribe(res => {
          if (res.code == 0 && res.data) {
            const html = res.data.replace(/data-src/g, 'src');
            this.option.data = 'data:text/html;charset=utf-8,' + html;
            this.errMsg = '';
          } else {
            this.errMsg = '{{ 获取文章失败 }}';
          }
        }, err => {
          this.errMsg = '{{ 获取文章失败 }}';
        });
    }
  }

  ngAfterViewInit() {
    if (this.option.type == '1' || !this.option.url) {
      this.inner.nativeElement.innerHTML = this.option.content;
    }
  }
}

export function ShowDetail(data, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: data,
    width: '375px'
  };
  return dialog.open(ArticleDetailComponent, option);
}

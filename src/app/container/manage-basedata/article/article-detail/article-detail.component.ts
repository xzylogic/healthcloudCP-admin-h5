import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {
  option: any = {};
  @ViewChild('inner') inner: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ArticleDetailComponent>
  ) {
    this.option.title = this.data.title || '{{ 此处为文章标题 }}';
    this.option.time = this.data.updateTime || new Date();
    this.option.content = this.data.content || '{{ 此处为文章内容 }}';
  }

  ngOnInit() {
    this.inner.nativeElement.innerHTML = this.option.content;
  }

  ngAfterViewInit() {
    // this.inner.nativeElement.innerHTML = this.option.content;
  }
}

export function ShowDetail(data, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: data,
    width: '375px'
  };
  return dialog.open(ArticleDetailComponent, option);
}

import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements AfterViewInit {
  option: any = {};
  @ViewChild('inner') inner: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ArticleDetailComponent>
  ) {
    this.option.title = this.data.title || '';
    this.option.time = this.data.updateTime || new Date();
    this.option.content = this.data.content || '';
  }

  ngAfterViewInit() {
    this.inner.nativeElement.innerHTML = this.option.content;
  }
}

export function ShowDetail(data, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: data,
    width: '375px'
  };
  return dialog.open(ArticleDetailComponent, option);
}

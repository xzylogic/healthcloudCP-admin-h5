import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lib-page',
  templateUrl: './page.component.html',
  styleUrls: ['./dtable.component.scss']
})
export class DPageComponent implements OnInit, OnChanges {
  @Input() page: number;
  @Input() total: number;
  @Output() pageEmitter = new EventEmitter();

  pageList: Array<any>;

  constructor() {
  }

  ngOnInit() {
    this.getPageList(Number(this.total), Number(this.page));
  }

  ngOnChanges() {
    this.getPageList(Number(this.total), Number(this.page));
  }

  getPageList(total, current) {
    const list = [];
    if (total <= 6) {
      for (let i = 0; i < total; i++) {
        list.push(i + 1);
      }
    } else if (total > 6) {
      if (current + 1 == 1) {
        list.push(1, current + 2, '...', total);
      } else if (current + 1 == 2) {
        list.push(1, current + 1, current + 2, '...', total);
      } else if (current + 1 == total - 1) {
        list.push(1, '...', current, current + 1, total);
      } else if (current + 1 == total) {
        list.push(1, '...', current, total);
      } else {
        list.push(1, '...', current, current + 1, current + 2, '...', total);
      }
    }
    this.pageList = list;
  }

  // 获取指定页
  getCurrentPage(page) {
    if (page != '...') {
      this.pageEmitter.emit(page - 1);
      this.getPageList(this.total, page - 1);
    }
  }

  // 获取前一页
  getPrePage() {
    if (this.page > 0) {
      this.pageEmitter.emit(this.page - 1);
      this.getPageList(this.total, this.page - 1);
    }
  }

  // 获取下一页
  getNextPage() {
    if (this.page < this.total - 1) {
      this.pageEmitter.emit(this.page + 1);
      this.getPageList(this.total, this.page + 1);
    }
  }

  // 获取第一页
  getFirstPage() {
    this.pageEmitter.emit(0);
    this.getPageList(this.total, 0);
  }

  // 获取最后一页
  getLastPage() {
    this.pageEmitter.emit(this.total - 1);
    this.getPageList(this.total, this.total - 1);
  }
}

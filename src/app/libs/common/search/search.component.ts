import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export enum SearchType {date, range}

declare let require;
const Flatpickr = require('flatpickr');
const ZH = require('flatpickr/dist/l10n/zh.js').zh;

@Component({
  selector: 'app-search',
  template: `
    <div class="input_container" style="display: inline-block;width: auto;" *ngIf="type==SearchType.date">
      <input class="input_content"
             [placeholder]="label"
             (change)="change()"
             [(ngModel)]="value" #date
      >
      <span class="input_span">{{label}}</span>
    </div>
    <div class="input_container" style="display: inline-block;width: 200px;" *ngIf="type==SearchType.range">
      <input class="input_content"
             [placeholder]="label"
             (change)="change()"
             [(ngModel)]="value" #range
      >
      <span class="input_span">{{label}}</span>
    </div>
  `,
  styleUrls: ['../../dform/component/lib-input/lib-input.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Input() type: SearchType;
  @Input() label: string;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('date') date: any;
  @ViewChild('range') range: any;
  SearchType = SearchType;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.type == this.SearchType.date) {
      const date = new Flatpickr(this.date.nativeElement, {
        'locale': ZH,
        'defaultDate': this.value || ''
      });
    }
    if (this.type == this.SearchType.range) {
      const range = new Flatpickr(this.range.nativeElement, {
        'locale': ZH,
        'mode': 'range',
        'defaultDate': this.value || ''
      });
    }
  }

  change() {
    if (this.type == this.SearchType.date) {
      this.valueChange.emit(this.date.nativeElement.value);
    }
    if (this.type == this.SearchType.range) {
      this.valueChange.emit(this.range.nativeElement.value);
    }
  }
}

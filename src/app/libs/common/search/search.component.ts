import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

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
    <div class="mat-input-wrapper mat-form-field-wrapper" *ngIf="type==SearchType.range">
      <div class="mat-input-flex mat-form-field-flex">
        <div class="mat-input-infix mat-form-field-infix">
          <input class="mat-input-element"
                 [placeholder]="label"
                 (change)="change()"
                 [(ngModel)]="value" #range
          >
          <span
            class="mat-input-placeholder-wrapper mat-form-field-placeholder-wrapper mat-form-field-can-float mat-form-field-should-float">
            <label class="mat-input-placeholder mat-form-field-placeholder"
                   style="display: block;"
            >{{label}}</label>
          </span>
        </div>
        <div class="mat-input-underline mat-form-field-underline">
          <span class="mat-input-ripple mat-form-field-ripple"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../dform/component/lib-input/lib-input.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClass = 'mat-input-container mat-form-field';
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

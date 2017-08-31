import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDate } from '../../_entity/form-date';

declare var require;
const Flatpickr = require('flatpickr');
const ZH = require('flatpickr/dist/l10n/zh.js').zh;

@Component({
  selector: 'app-input-date',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content"
               [placeholder]="data.placeholder"
               [formControlName]="data.key"
               [(ngModel)]="value"
               (change)="change()" #date
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputDateComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() data: FormDate;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('date') date: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.data && this.data.options) {
      const date = new Flatpickr(this.date.nativeElement, {
        'locale': ZH,
        'defaultDate': this.value || '',
        'minDate': this.data.options.minDate || '',
        'maxDate': this.data.options.maxDate || '',
      });
    } else {
      const date = new Flatpickr(this.date.nativeElement, {
        'locale': ZH,
        'defaultDate': this.value || '',
      });
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }
}

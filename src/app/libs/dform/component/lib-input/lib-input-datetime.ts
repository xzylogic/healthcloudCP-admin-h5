import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

declare var require;
const Flatpickr = require('flatpickr');
const ZH = require('flatpickr/dist/l10n/zh.js').zh;

@Component({
  selector: 'app-input-datetime',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content"
               [placeholder]="data.placeholder"
               [formControlName]="data.key"
               [(ngModel)]="value"
               (change)="change()" #datetime
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputDatetimeComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datetime') datetime: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const date = new Flatpickr(this.datetime.nativeElement, {
      'locale': ZH,
      'enableTime': true,
      'time_24hr': true,
      'defaultDate': this.value || ''
    });
  }

  change() {
    this.valueChange.emit(this.value);
  }
}

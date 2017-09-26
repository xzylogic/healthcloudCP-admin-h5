import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

// declare var require;
// const Flatpickr = require('flatpickr');
// const ZH = require('flatpickr/dist/l10n/zh.js').zh;

import * as laydate from 'layui-laydate/';
import { FormDatetime } from '../../_entity/form-datetime';

@Component({
  selector: 'app-input-datetime',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content"
               [placeholder]="data.placeholder"
               [formControlName]="data.key"
               [(ngModel)]="value"
               #datetime
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputDatetimeComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() data: FormDatetime;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datetime') datetime: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    laydate.path = '/assets/';
    laydate.render({
      elem: this.datetime.nativeElement,
      type: 'datetime',
      range: this.data.options == 'range',
      value: this.value,
      done: (value, date, endDate) => {
        console.log(value);
        console.log(date);
        console.log(endDate);
        console.log(this.datetime);
        this.value = value;
        this.cdr.detectChanges();
        console.log(this.value);
        this.valueChange.emit(this.value);
      }
    });
    // const date = new Flatpickr(this.datetime.nativeElement, {
    //   'locale': ZH,
    //   'enableTime': true,
    //   'time_24hr': true,
    //   'defaultDate': this.value || ''
    // });
  }

  // change() {
  //   this.valueChange.emit(this.value);
  // }
}

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDate } from '../../_entity/form-date';

import flatpickr from 'flatpickr';
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';

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
      const date = flatpickr(this.date.nativeElement, {
        'locale': Mandarin,
        'defaultDate': this.value || '',
        'minDate': this.data.options.minDate || '',
        'maxDate': this.data.options.maxDate || '',
      });
    } else {
      const date = flatpickr(this.date.nativeElement, {
        'locale': Mandarin,
        'defaultDate': this.value || '',
      });
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }
}

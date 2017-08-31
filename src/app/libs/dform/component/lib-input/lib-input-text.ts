import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

@Component({
  selector: 'app-input-text',
  template: `
    <div [formGroup]="form">
      <md-input-container *ngIf="!data.maxlength" style="width: 100%">
        <input mdInput [type]="data.type"
               [placeholder]="data.label"
               [formControlName]="data.key"
               [(ngModel)]="value"
               [readonly]="data.readonly"
               (keyup)="change()"
               (change)="change()"
        >
        <md-error>{{data.errMsg}}</md-error>
      </md-input-container>
      <md-input-container *ngIf="data.maxlength" style="width: 100%">
        <input mdInput [type]="data.type"
               [maxlength]="data.maxlength"
               [placeholder]="data.label"
               [formControlName]="data.key"
               [(ngModel)]="value"
               [readonly]="data.readonly"
               (keyup)="change()"
               (change)="change()"
        >
        <md-hint align="end">{{value.length}} / {{data.maxlength}}</md-hint>
      </md-input-container>
    </div>
  `
})
export class LibInputTextComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    this.valueChange.emit(this.value);
  }
}

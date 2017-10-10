import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormTextarea } from '../../_entity/form-textarea';

@Component({
  selector: 'app-input-textarea',
  template: `
    <div [formGroup]="form">
      <md-input-container *ngIf="!data.maxlength" style="width: 100%" floatPlaceholder="always">
        <textarea mdInput [attr.row]="data.size"
                  [placeholder]="data.label" [formControlName]="data.key"
                  [(ngModel)]="value" (change)="change()" (keyup)="change()">
        </textarea>
        <md-error>{{data.errMsg}}</md-error>
      </md-input-container>
      <md-input-container *ngIf="data.maxlength" style="width: 100%" floatPlaceholder="always">
        <textarea mdInput [maxlength]="data.maxlength" [attr.row]="data.size"
                  [placeholder]="data.label" [formControlName]="data.key"
                  [(ngModel)]="value" (change)="change()" (keyup)="change()">
        </textarea>
        <md-error>{{data.errMsg}}</md-error>
        <md-hint align="end">{{value.length}} / {{data.maxlength}}</md-hint>
      </md-input-container>
    </div>
  `
})
export class LibInputTextareaComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormTextarea;
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

import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormCheckbox } from '../../_entity/form-checkbox';

@Component({
  selector: 'app-input-checkbox',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <section calss="input_content">
          <mat-checkbox class="check_content"
                      [(checked)]="checkedAll"
                      (change)="getCheckedAll($event)"
          >{{data.allCheckedName}}</mat-checkbox><mat-checkbox class="check_content"
                       *ngFor="let opt of data.options"
                       [(checked)]="opt.checked"
                       (change)="getChecked($event, opt.id, opt)"
          >{{opt.name}}</mat-checkbox>
        </section>
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputCheckboxComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() data: FormCheckbox;
  @Input() value: Array<any>;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('date') date: any;

  checkedAll = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.data.options.forEach(obj => {
      obj.checked = false;
      if (this.value.indexOf(obj.id) > -1) {
        obj.checked = true;
      }
    });
    this.setCheckedAll();
  }

  setCheckedAll() {
    const list = [];
    this.data.options.forEach(obj => {
      if (obj.checked == true) {
        list.push(obj);
      }
    });
    // console.log(this.data.options);
    // console.log(list);
    if (list.length === this.data.options.length) {
      this.checkedAll = true;
    } else {
      this.checkedAll = false;
    }
    // console.log(this.checkedAll);
  }

  getCheckedAll(event) {
    const value = [];
    const checked = event.checked;
    this.checkedAll = event.checked;
    this.data.options.forEach(obj => {
      obj.checked = checked;
      if (checked) {
        value.push(obj.id);
      }
    });
    this.value = value;
  }

  getChecked(event, id, opt) {
    opt.checked = event.checked;
    let index = this.value.indexOf(id);
    if (event.checked) {
      if (index = -1) {
        this.value.push(id);
      }
    } else {
      if (index > -1) {
        this.value.splice(index, 1);
      }
    }
    this.change();
    this.setCheckedAll();
  }

  change() {
    // console.log(this.value);
    this.valueChange.emit(this.value);
  }
}

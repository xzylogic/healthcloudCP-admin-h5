import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormType } from '../_entity/form-base';

@Component({
  selector: 'app-form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form.component.scss']
})
export class DynamicFormSetComponent implements OnInit, OnChanges {
  @Input() formdata: any;
  @Input() form: FormGroup;

  formControl = FormType;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  //   if (this.formdata.isOptional && (this.form.controls[this.formdata.optional.key]['value'] != this.formdata.optional.value)) {
  //     console.log(this.form.controls[this.formdata.key]);
  //   }
  }
}

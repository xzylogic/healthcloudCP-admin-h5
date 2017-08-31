import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

@Component({
  selector: 'app-input-editor',
  template: `
    <div [formGroup]="form">
      <div class="input_container" style="padding-top: 2em">
        <!--<quill-editor calss="input_content"-->
        <!--[formControlName]="data.key"-->
        <!--[(ngModel)]="value"-->
        <!--[options]="editorOptions"-->
        <!--&gt;</quill-editor>-->
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputEditorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  editorOptions: Object;

  constructor() {
  }

  ngOnInit() {
    this.editorOptions = {
      placeholder: this.data.placeholder || '',
      modules: {
        toolbar: ToolbarOptions
      }
    };
  }
}

const ToolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}, {'header': 3}, {'header': 4}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],

  ['clean']                                         // remove formatting button
];


import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogConfig, MdDialogRef } from '@angular/material';
import { DialogEdit } from './dialog.entity';

@Component({
  selector: 'app-dialog-edit',
  template: `
    <h1 md-dialog-title>{{option.title}}</h1>
    <div md-dialog-content style="min-width: 320px; width: 50vw">
      <app-form *ngIf="option.form" [formDatas]="option.form" (formValues)="dialogRef.close($event)"></app-form>
    </div>
  `
})
export class DialogEditComponent {
  option: DialogEdit = new DialogEdit();

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DialogEditComponent>
  ) {
    this.option = this.data;
  }
}

export function EditDialog(option: DialogEdit, dialog) {
  const config: MdDialogConfig = <MdDialogConfig> {
    data: option
  };
  return dialog.open(DialogEditComponent, config);
}

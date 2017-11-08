import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-img',
  template: `
    <h1 mat-dialog-title>{{option.title}}</h1>
    <div mat-dialog-content>
      <img [src]="option.image" alt="{{option.title}}">
    </div>
  `
})
export class DialogImgComponent {
  option: { title: string, image: string } = {title: '', image: ''};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogImgComponent>
  ) {
    this.option = this.data;
  }
}

export function ImageDialog(title, image, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: {title: title, image: image}
  };
  return dialog.open(DialogImgComponent, option);
}

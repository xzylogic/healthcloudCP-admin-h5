import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-img',
  template: `
    <h1 md-dialog-title>{{option.title}}</h1>
    <div md-dialog-content>
      <img [src]="option.image" alt="{{option.title}}">
    </div>
  `
})
export class DialogImgComponent {
  option: { title: string, image: string } = {title: '', image: ''};

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DialogImgComponent>
  ) {
    this.option = this.data;
  }
}

export function ImageDialog(title, image, dialog) {
  const option: MdDialogConfig = <MdDialogConfig>{
    data: {title: title, image: image}
  };
  return dialog.open(DialogImgComponent, option);
}

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { HttpService } from '../../../_service/http.service';
import { FormFile } from '../../_entity/form-file';
import { HintDialog } from '../../../dmodal/dialog.component';

@Component({
  selector: 'app-input-file',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content" #file type="file" (change)="uploadChange($event)">
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
        <div class="upload_container">
          <div class="upload_content" *ngIf="!data.multiple&&value">
            <img class="image" [src]="value">
            <md-icon (click)="fileDel()">close</md-icon>
          </div>
          <div *ngIf="data.multiple">
            <div class="upload_content" *ngFor="let item of value">
              <img class="image" [src]="item">
              <md-icon (click)="fileDel(item)">close</md-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputFileComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormFile;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('file') file: any;

  constructor(
    private uploadService: HttpService,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.data.multiple === true && this.value) {
      this.value = typeof this.value === 'object' ? this.value : [this.value];
    }
  }

  // 上传图片操作
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this.uploadService.upload(this.data.url, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('上传图片成功！', this.dialog);
          if (this.data.multiple === false) {
            this.value = res.data;
          } else {
            if (!this.value) {
              this.value = [];
            }
            this.value.push(res.data);
          }
          this.cdr.detectChanges();
        } else {
          HintDialog(res.msg || '上传图片失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传图片失败！', this.dialog);
      });
  }

  fileDel(file ?: any) {
    if (!file) {
      this.value = '';
      this.file.nativeElement.value = '';
      this.cdr.detectChanges();
      HintDialog('删除照片成功！', this.dialog);
    } else {
      const i = this.value.indexOf(file);
      if (i !== -1) {
        this.value.splice(i, 1);
        this.cdr.detectChanges();
      }
      if (this.value.length === 0) {
        this.value = null;
        this.file.nativeElement.value = '';
        this.cdr.detectChanges();
      }
      HintDialog('删除照片成功！', this.dialog);
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }
}

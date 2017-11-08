import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { HttpService } from '../../../_service/http.service';
import { FormFile } from '../../_entity/form-file';
import { HintDialog } from '../../../dmodal/dialog.component';

@Component({
  selector: 'app-input-file',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content" #file type="file" accept="image/png,image/jpg,image/jpeg" (change)="uploadChange($event)">
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
        <div class="upload_container">
          <div class="upload_content" *ngIf="!data.multiple&&value">
            <img class="image" [src]="value">
            <mat-icon (click)="fileDel()">close</mat-icon>
          </div>
          <div *ngIf="data.multiple">
            <div class="upload_content" *ngFor="let item of value">
              <img class="image" [src]="item">
              <mat-icon (click)="fileDel(item)">close</mat-icon>
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

  domain: string;

  constructor(
    @Inject('app') private app,
    private uploadService: HttpService,
    private dialog: MatDialog,
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
    const fileCopy = files.target.files[0];
    if (this.data.size && fileCopy && (fileCopy.size > this.data.size * 1024)) {
      HintDialog(`上传的图片不能超过${this.data.size}KB！`, this.dialog);
    } else if (fileCopy && !(fileCopy.type == 'image/jpg' || fileCopy.type == 'image/jpeg' || fileCopy.type == 'image/png')) {
      HintDialog(`请上传格式为JPG或者PNG的图片！`, this.dialog);
    } else if (fileCopy) {
      this.uploadService.get(`${this.app.api_url}/admin/common/getQiniuToken`)
        .subscribe(sres => {
          if (sres.code === 0 && sres.data) {
            this.domain = sres.data.domain;
            myForm.append('file', files.target.files[0]);
            myForm.append('token', sres.data.token);
            myForm.append('key', (new Date()).valueOf().toString());
            this.uploadService.upload('http://upload.qiniu.com', myForm)
              .subscribe(res => {
                if (res.key) {
                  HintDialog('上传图片成功！', this.dialog);
                  if (this.data.multiple === false) {
                    this.value = `http://${this.domain}/${res.key}`;
                  } else {
                    if (!this.value) {
                      this.value = [];
                    }
                    this.value.push(`http://${this.domain}/${res.key}`);
                  }
                  this.cdr.detectChanges();
                } else {
                  HintDialog(res.msg || '上传图片失败！', this.dialog);
                }
              }, err => {
                console.log(err);
                HintDialog('上传图片失败！', this.dialog);
              });
          } else {
            HintDialog(sres.msg || '上传图片失败！', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('上传图片失败！', this.dialog);
        });
    }
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

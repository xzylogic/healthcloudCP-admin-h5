import { Component, ContentChildren, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { ActivatedRoute } from '@angular/router';
import flatpickr from 'flatpickr';
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';

@Component({
  selector: 'app-pregnancy-interview-detail',
  templateUrl: './pregnancy-interview-detail.component.html',
  styleUrls: ['./pregnancy-interview-detail.component.scss']
})
export class PregnancyInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  formData: any;
  formDataDto: any;
  id: any;
  userId: any;
  pregnancyPeriod = 0;
  pregnancyState = [1, 1, 1, 1, 1];

  @ContentChildren('date') date: any;

  constructor(
    @Inject('auth') private auth,
    private dialog: MatDialog,
    @Inject('interview') private interviewService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.id = route.id;
        this.getDetail();
      }
    });
  }

  getDetail() {
    this.interviewService.getDetail(this.id)
      .subscribe(res => {
        if (res.code == 0 && res.data) {
          this.formData = res.data || {};
          this.formDataDto = res.data.followDuringPregnancyQuestionnairesDto || [];
          this.userId = res.data.addUserId;
        }
      }, err => {
        console.log(err);
      });
  }

  getValue(form) {
    const formData = {
      userId: this.userId,
      followDuringPregnancyId: this.id,
      pregnancyPeriod: this.formDataDto[this.pregnancyPeriod].pregnancyPeriodId,
      pregnancyState: this.formDataDto[this.pregnancyPeriod].pregnancyStateId,
      answer: JSON.stringify(form),
      doctorId: this.auth.getAdminId()
    };
    console.log(JSON.stringify(formData));
    this.interviewService.saveDetail(formData)
      .subscribe(res => {
        if (res.code === 0) {
          this.getDetail();
          HintDialog(res.msg || '提交成功！', this.dialog);
        } else {
          HintDialog(res.msg || '提交失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  getName(str): string {
    let result = '';
    result = str.split('#')[0];
    return result;
  }

  getUnit(str): string {
    let result = '';
    result = str.split('#')[1];
    return result;
  }

  datePicker(event) {
    const picker: any = flatpickr(event.target, {
      'locale': Mandarin,
      'defaultDate': event.target.value,
      'enableTime': true,
      'time_24hr': true
    });
    picker.open();
  }

  push(pregnancy) {
    HintDialog(`是否短信提醒用户填写${pregnancy}的随访问卷？`, this.dialog)
      .afterClosed().subscribe(res => {
      if (res && res.key == 'confirm') {
        this.sendMsg(this.id, pregnancy);
      }
    });
  }

  sendMsg(id, pregnancy) {
    this.interviewService.sendMessage(id, pregnancy)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '提醒成功！', this.dialog);
        } else {
          HintDialog(res.msg || '提醒失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}

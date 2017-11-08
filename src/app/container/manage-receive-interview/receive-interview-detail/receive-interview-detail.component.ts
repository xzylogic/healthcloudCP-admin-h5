import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MdDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-receive-interview-detail',
  templateUrl: './receive-interview-detail.component.html',
  styleUrls: ['./receive-interview-detail.component.scss']
})
export class ReceiveInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  initData: any;
  cardnum: string;

  constructor(
    @Inject('interview') private interviewService,
    private dialog: MdDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.cardnum = route.id;
        this.getData(route.id);
      }
    });
  }

  getData(card) {
    this.interviewService.getDataDetail(card)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.formatData(res.data);
          this.initData = res.data;
          console.log(this.initData);
        } else {

        }
      }, err => {
        console.log(err);
      });
  }

  formatData(data) {
    if (data && Array.isArray(data)) {
      data.forEach(obj => {
        obj.startTime = obj.startTime && new Date(obj.startTime) || null;
        obj.endTime = obj.endTime && new Date(obj.endTime) || null;
        obj.abortionDate = obj.abortionDate && new Date(obj.abortionDate) || null;
        obj.deliveryTime = obj.deliveryTime && new Date(obj.deliveryTime) || null;
        obj.lastPeriodTime = obj.lastPeriodTime && new Date(obj.lastPeriodTime) || null;
      });
    }
  }

  getValue(data, i) {
    console.log(data);
    const formData: any = {};
    const keys = Object.keys(data);
    keys.forEach(key => {
      formData[key.substring(0, key.length - 1)] =
        (key == `startTime${i}`) || (key == `endTime${i}`) ||
        (key == `abortionDate${i}`) || (key == `deliveryTime${i}`) || (key == `lastPeriodTime${i}`) ?
          moment(new Date(data[key])).format('YYYY-MM-DD') : data[key];
    });
    formData.recordId = this.initData[i].recordId;
    formData.questionnairesType = this.initData[i].questionnairesType;
    console.log(formData);
    this.interviewService.saveDetail(formData)
      .subscribe(res => {
        if (res.code == 0) {
          this.getData(this.cardnum);
          HintDialog(res.msg || '保存成功', this.dialog);
        } else {
          HintDialog(res.msg || '保存失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}

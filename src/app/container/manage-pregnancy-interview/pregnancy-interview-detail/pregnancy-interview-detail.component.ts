import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-pregnancy-interview-detail',
  templateUrl: './pregnancy-interview-detail.component.html',
  styleUrls: ['./pregnancy-interview-detail.component.scss']
})
export class PregnancyInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  formData: any;
  userId: any;
  pregnancyPeriod = 0;
  pregnancyState = [1, 1, 1, 1, 1];

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewDetailConfig();
    this.getDetail();
  }

  getDetail() {
    this.interviewService.getDetail(123, 123)
      .subscribe(res => {
        console.log(res);
        if (res.code == 0 && res.data) {
          this.formData = res.data.followDuringPregnancyQuestionnairesDto || [];
        }
      }, err => {
        console.log(err);
      });
  }

  getValue(form) {
    console.log({data: JSON.stringify(form)});
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
}

import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-pregnancy-interview-detail',
  templateUrl: './pregnancy-interview-detail.component.html'
})
export class PregnancyInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  formData: any;
  id: any;

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewDetailConfig();
    this.getDetail();
  }

  getDetail() {
    this.interviewService.getDetail(123)
      .subscribe(res => {
        console.log(res);
        if (res.code == 0 && res.data) {
          this.formData = res.data;
        }
      }, err => {
        console.log(err);
      });
  }

  getValue(form) {
    console.log(form);
  }
}

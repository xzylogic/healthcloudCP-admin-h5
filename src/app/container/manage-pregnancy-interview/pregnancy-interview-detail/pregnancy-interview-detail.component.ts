import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-pregnancy-interview-detail',
  templateUrl: './pregnancy-interview-detail.component.html'
})
export class PregnancyInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewDetailConfig();
  }
}

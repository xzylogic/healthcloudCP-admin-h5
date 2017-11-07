import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-receive-interview-detail',
  templateUrl: './receive-interview-detail.component.html'
})
export class ReceiveInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  formThree: any = {};

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewDetailConfig();
  }

  getValue(value) {
    console.log(value);
  }
}

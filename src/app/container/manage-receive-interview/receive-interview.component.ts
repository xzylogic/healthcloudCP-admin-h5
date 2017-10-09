import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';

@Component({
  selector: 'app-receive-interview',
  templateUrl: './receive-interview.component.html'
})
export class ReceiveInterviewComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewConfig();
  }
}

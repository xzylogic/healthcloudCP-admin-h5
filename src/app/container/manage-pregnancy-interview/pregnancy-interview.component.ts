import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';

@Component({
  selector: 'app-pregnancy-interview',
  templateUrl: './pregnancy-interview.component.html'
})
export class PregnancyInterviewComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('interview') private interviewService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewConfig();
  }
}

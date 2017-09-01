import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('feedback') private feedbackService) {
  }

  ngOnInit() {
    this.containerConfig = this.feedbackService.setFeedbackConfig();
  }
}

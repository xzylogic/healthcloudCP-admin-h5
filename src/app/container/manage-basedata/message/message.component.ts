import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(@Inject('message') private messageService) {
  }

  ngOnInit() {
    this.containerConfig = this.messageService.setMessageConfig();
  }
}

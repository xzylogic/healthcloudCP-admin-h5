import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receive-interview-detail',
  templateUrl: './receive-interview-detail.component.html'
})
export class ReceiveInterviewDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  formThree: any = {};
  initData: any;
  cardnum: string;

  constructor(
    @Inject('interview') private interviewService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.cardnum = route.id;
        this.getValue(route.id);
      }
    });
  }

  getValue(card) {
    this.interviewService.getDataDetail(card)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.initData = res.data;
        } else {

        }
      }, err => {
        console.log(err);
      });
  }
}

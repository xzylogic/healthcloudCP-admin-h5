import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {
  subscribeRoute: any;
  subscribeDetail: any;

  containerConfig: ContainerConfig;
  data: any;
  errMsg = '';

  constructor(
    @Inject('feedback') private feedbackService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.feedbackService.setFeedbackDetailConfig();
    this.subscribeRoute = this.route.params.subscribe(res => {
      if (res.id) {
        this.getFeedback(res.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
  }

  getFeedback(id) {
    this.subscribeDetail = this.feedbackService.getFeedback(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.data = res.data;
        } else {
          this.errMsg = res.msg || '啊哦！你要找的信息不存在～';
        }
      }, err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  back() {
    history.go(-1);
  }
}

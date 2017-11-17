import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit, OnDestroy {
  paramsMenu: string;

  subscribeRoute: any;
  subscribeDetail: any;

  containerConfig: ContainerConfig;
  feedbackTable: TableOption;

  tel = '';
  queryTime = '';

  constructor(
    @Inject('feedback') private feedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = this.route.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
        this.containerConfig = this.feedbackService.setFeedbackConfig();
        this.feedbackTable = new TableOption({
          titles: this.feedbackService.setFeedbackTable(),
          ifPage: true
        });
        this.reset();
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

  reset() {
    this.tel = '';
    this.queryTime = '';
    this.getFeedbacks(0);
  }

  getFeedbacks(page) {
    this.feedbackTable.reset(page);
    this.subscribeDetail = this.feedbackService.getFeedbacks(
      page, this.feedbackTable.size,
      this.tel,
      this.queryTime.split(' 至 ')[0] || '',
      this.queryTime.split(' 至 ')[1] || '',
    )
      .subscribe(res => {
        this.feedbackTable.loading = false;
        if (!res.data || (res.data && res.data.length == 0)) {
          this.feedbackTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.totalPages) {
          this.feedbackTable.totalPage = res.totalPages;
          this.feedbackTable.lists = res.data;
        } else {
          this.feedbackTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.feedbackTable.loading = false;
        this.feedbackTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(data) {
    if (data.key === 'detail') {
      this.router.navigate(['feedback', this.paramsMenu, 'detail', data.value.id]);
    }
  }

}

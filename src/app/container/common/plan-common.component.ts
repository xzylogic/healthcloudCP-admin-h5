import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../libs/common/container/container.component';

@Component({
  selector: 'app-plan-common',
  templateUrl: './plan-common.component.html',
  styleUrls: ['./plan-common.component.scss']
})
export class PlanCommonComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  private sub: any;
  date: any;
  type: any;
  listAm: any;
  scheduleAm: any;
  listPm: any;
  schedulePm: any;

  constructor(
    @Inject('plancommon') private planCommonService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(route => {
      if (route.date && route.type) {
        this.date = route.date;
        this.type = route.type;
        let title = '';
        let router = '';
        if (route.type === 'jm') {
          title = '计划免疫预约';
          router = '/planned-immunity/plan';
        }
        if (route.type === 'jd') {
          title = '母子建档预约';
          router = '/mac-database/plan';
        }
        if (route.type === 'tj') {
          title = '儿童体检预约';
          router = '/pe-for-children/plan';
        }
        if (route.type === 'ys') {
          title = '叶酸领取预约';
          router = '/receive-folic-acid/plan';
        }
        this.containerConfig = this.planCommonService.setPlanConfig(title, router, this.date);
        this.getDefault();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDefault() {
    this.planCommonService.getDefault(this.type, this.date)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
          console.log(res.data.content);
          this.listAm = res.data.content[0] || {};
          this.scheduleAm = res.data.content[0] && res.data.content[0].schedulingDateTimeDtos || [];
          this.listPm = res.data.content[1] || {};
          this.schedulePm = res.data.content[1] && res.data.content[1].schedulingDateTimeDtos || [];
        }
      });
  }

  saveDate() {
    console.log(this.listAm);
    console.log(this.listPm);
    console.log(this.scheduleAm);
    console.log(this.schedulePm);
  }
}

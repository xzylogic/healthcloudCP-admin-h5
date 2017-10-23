import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { MdDialog } from '@angular/material';
import { ERRMSG } from '../_store/static';

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
  flag = true;
  operation: any;

  constructor(
    @Inject('plancommon') private planCommonService,
    private dialog: MdDialog,
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
    this.route.queryParams.subscribe(param => {
      this.planCommonService.getDefault(this.type, this.date, param.org || '')
        .subscribe(res => {
          if (res.code === 0 && res.data && res.data.content) {
            this.flag = res.data.more;
            this.operation = res.data.extras.operation;
            this.listAm = res.data.content[0] || {};
            this.scheduleAm = res.data.content[0] && res.data.content[0].schedulingDateTimeDtos || [];
            this.listPm = res.data.content[1] || {};
            this.schedulePm = res.data.content[1] && res.data.content[1].schedulingDateTimeDtos || [];
          }
        });
    });
  }

  setAmWorkState(status) {
    this.listAm.workState = status;
    this.scheduleAm.forEach(obj => {
      obj.workState = status;
    });
  }

  setPmWorkState(status) {
    this.listPm.workState = status;
    this.schedulePm.forEach(obj => {
      obj.workState = status;
    });
  }

  saveDate() {
    const postData = [];
    postData.push(this.listAm);
    postData.push(this.listPm);
    postData[0].schedulingDateTimeDtos = this.scheduleAm;
    postData[1].schedulingDateTimeDtos = this.schedulePm;
    this.planCommonService.saveDefault(postData)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('保存成功', this.dialog);
          this.getDefault();
        } else {
          HintDialog(res.msg || '保存失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}

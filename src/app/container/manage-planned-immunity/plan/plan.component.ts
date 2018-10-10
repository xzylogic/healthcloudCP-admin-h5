import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { CalendarEvent } from 'angular-calendar';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-planned-immunity-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['../../common/plan-common.component.scss']
})
export class PlanComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['planned-immunity-plan', 'data']) data: Observable<any>;
  viewDate: Date = new Date();
  tab = 0;
  weekListAm: any;
  weekListPm: any;
  timeList1: any;
  timeList2: any;
  timeList3: any;
  timeList4: any;
  timeList5: any;
  timeList6: any;
  centerId = '';
  siteId = '';
  centerList: Array<any>;
  siteList: Array<any>;
  communityList: Array<any>;
  orgName = '';
  orgNameRecord = '';
  operationWeek: any;
  operationTime: any;
  show: any;

  vaccineSchedule: any;

  events: CalendarEvent[] = [];

  constructor(
    @Inject('action') private action,
    @Inject('plan') private planService,
    @Inject('auth') private auth,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.planService.setPlanConfig();
    this.route.queryParams.subscribe(res => {
      if (res.tab) {
        this.tab = res.tab;
      }
      if (res.date) {
        this.viewDate = new Date(res.date);
      }
      if (res.flag) {
        this.data.subscribe(data => {
          if (data) {
            this.siteId = data.siteId;
            this.centerId = data.centerId;
            this.orgName = data.orgName;
            this.orgNameRecord = '';
            this.search();
          } else {
            this.reset();
          }
        });
      } else {
        this.reset();
      }
    });
    this.getCommunityAll();
  }

  reset() {
    this.siteId = '';
    this.centerId = '';
    this.orgName = this.auth.getDepartmentName() ?
      `${this.auth.getHospitalName()} - 预防保健科` : this.auth.getHospitalName();
    this.orgNameRecord = '';
    this.getSite(this.communityList);
    this.getCenter(this.communityList);
    this.search();
  }

  initWeek() {
    this.weekListAm = null;
    this.weekListPm = null;
    this.operationWeek = null;
  }

  initTime() {
    this.timeList1 = null;
    this.timeList2 = null;
    this.timeList3 = null;
    this.timeList4 = null;
    this.timeList5 = null;
    this.timeList6 = null;
    this.operationTime = null;
  }

  search() {
    this.orgName = this.orgNameRecord || this.orgName;
    this.getWeekList();
    this.getTimeList();
    this.getDays();
    this.getVaccineSchedule();
  }

  getVaccineSchedule() {
    this.planService.getVaccineSchedule(this.siteId || this.centerId)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.vaccineSchedule = res.data;
        }
      });
  }

  getWeekList() {
    this.initWeek();
    this.planService.getWeekList(this.siteId || this.centerId)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
          this.operationWeek = res.data.extras.operation;
          this.show = res.data.extras.isExist;
          const week = res.data.content;
          this.weekListAm = week[0].length === 7 ? week[0] : defalutWeekList[0];
          this.weekListPm = week[1].length === 7 ? week[1] : defalutWeekList[1];
        }
      });
  }

  getTimeList() {
    this.initTime();
    this.planService.getTimeList(this.siteId || this.centerId)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
          this.operationTime = res.data.extras.operation;
          this.show = res.data.extras.isExist;
          const time = res.data.content;
          if (time[0] && time[0].length === 7 &&
            time[1] && time[1].length === 7 &&
            time[2] && time[2].length === 7 &&
            time[3] && time[3].length === 7 &&
            time[4] && time[4].length === 7 &&
            time[5] && time[5].length === 7) {
            this.timeList1 = time[0];
            this.timeList2 = time[1];
            this.timeList3 = time[2];
            this.timeList4 = time[3];
            this.timeList5 = time[4];
            this.timeList6 = time[5];
          }
        }
      });
  }

  saveWeekList() {
    this.planService.saveWeekList([...this.weekListAm, ...this.weekListPm])
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('保存成功', this.dialog);
          this.getWeekList();
          this.getTimeList();
        } else {
          HintDialog(res.msg || '保存失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  saveTimeList() {
    this.planService.saveTimeList([
      ...this.timeList1,
      ...this.timeList2,
      ...this.timeList3,
      ...this.timeList4,
      ...this.timeList5,
      ...this.timeList6
    ])
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('保存成功', this.dialog);
          this.getTimeList();
        } else {
          HintDialog(res.msg || '保存失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  getDays() {
    this.planService.getDays(this.siteId || this.centerId)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.events = this.resetEvents(res.data);
        }
      });
  }

  resetEvents(data) {
    const list: CalendarEvent[] = [];
    if (Array.isArray(data) && (new Date(data[0]) instanceof Date)) {
      data.forEach(obj => {
        list.push({
          title: '已设置特殊日期',
          start: new Date(obj),
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
          }
        });
      });
    }
    return list;
  }

  handleDayClick(date) {
    this.action.dataChange('planned-immunity-plan', {
      siteId: this.siteId,
      centerId: this.centerId,
      orgName: this.orgName
    });
    this.router.navigate(['/planned-immunity/plan/edit', date, 'jm'], {queryParams: {org: this.siteId || this.centerId}});
  }

  getCommunityAll() {
    this.planService.getCommunity()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.communityList = res.data;
          this.getCenter(res.data);
          this.getSite(res.data);
        }
      });
  }

  // 获取中心列表
  getCenter(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 1) {
          center.push(obj);
        }
      });
      this.centerList = center;
    }
  }

  // 获取站点列表
  getSite(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 2) {
          center.push(obj);
        }
      });
      this.siteList = center;
    }
  }

  centerChange(data) {
    if (Array.isArray(this.centerList)) {
      this.centerList.forEach(obj => {
        if (obj.menuId == data.value) {
          this.orgNameRecord = obj.name;
        }
      });
    }
    if (data.value) {
      this.siteId = '';
      const site = [{menuId: '', name: '无'}];
      this.communityList.forEach(obj => {
        if (obj.parentId === data.value && obj.type == 2) {
          site.push(obj);
        }
      });
      if (site.length !== 1) {
        site.splice(0, 1);
      }
      this.siteList = site;
    }
  }

  siteChange(data) {
    if (Array.isArray(this.siteList)) {
      this.siteList.forEach(obj => {
        if (obj.menuId == data.value) {
          this.orgNameRecord = obj.name;
        }
      });
    }
  }
}

const defalutWeekList = [
  [
    {
      'week': '0',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '1',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '2',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '3',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '4',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '5',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '6',
      'amPm': 'am',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    }
  ],
  [
    {
      'week': '0',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '1',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '2',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '3',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '4',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '5',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    },
    {
      'week': '6',
      'amPm': 'pm',
      'workState': false,
      'delFlag': 0,
      'type': 'jm'
    }
  ]
];
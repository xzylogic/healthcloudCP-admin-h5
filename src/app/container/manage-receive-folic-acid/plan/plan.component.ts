import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-receive-folic-acid-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['../../common/plan-common.component.scss']
})
export class PlanComponent implements OnInit {
  containerConfig: ContainerConfig;
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

  events: CalendarEvent[] = [];

  constructor(
    @Inject('plan') private planService,
    private dialog: MdDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.planService.setPlanConfig();
    this.getWeekList();
    this.getTimeList();
    this.getDays();
    this.route.queryParams.subscribe(res => {
      if (res.tab) {
        this.tab = res.tab;
      }
      if (res.date) {
        this.viewDate = new Date(res.date);
      }
    });
  }

  getWeekList() {
    this.planService.getWeekList()
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
          const week = res.data.content;
          this.weekListAm = week[0].length === 7 ? week[0] : defalutWeekList[0];
          this.weekListPm = week[1].length === 7 ? week[1] : defalutWeekList[1];
        }
      });
  }

  getTimeList() {
    this.planService.getTimeList()
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
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
    this.planService.getDays()
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
    this.router.navigate(['/receive-folic-acid/plan/edit', date, 'ys']);
  }

  resetNumber(list, i) {
    const num = list[i].stock;
    if (isNaN(Number(num)) || num < 0) {
      list[i].stock = 0;
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

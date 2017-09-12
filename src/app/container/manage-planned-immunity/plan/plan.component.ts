import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { CalendarEvent } from 'angular-calendar';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay
} from 'date-fns';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'app-planned-immunity-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit, AfterViewInit {
  containerConfig: ContainerConfig;
  weekListAm: any;
  weekListPm: any;
  timeList1: any;
  timeList2: any;
  timeList3: any;
  timeList4: any;
  timeList5: any;
  timeList6: any;

  view: CalendarPeriod = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      title: '已设置特殊日期',
      start: new Date('2017-01-01'),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    },
    {
      title: '已设置特殊日期',
      start: new Date('2017-09-12'),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    },
    {
      title: '已设置特殊日期',
      start: new Date('2017-09-12'),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    },
    {
      title: '已设置特殊日期',
      start: new Date('2017-09-13'),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    }
  ];
  minDate: Date = new Date(`${new Date().getFullYear()}-01-01`);
  maxDate: Date = new Date(`${new Date().getFullYear()}-12-31`);
  prevBtnDisabled = false;
  nextBtnDisabled = false;

  constructor(
    @Inject('plan') private planService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.planService.setPlanConfig();
    this.getDays();
  }

  ngAfterViewInit() {
  }

  // setCalendar(days) {
  //   this.options = {
  //     header: {
  //       left: 'title',
  //       center: '',
  //       right: 'today prev,next'
  //     },
  //     defaultDate: new Date(),
  //     defaultView: 'month',
  //     locale: 'zh-cn',
  //     buttonText: {
  //       today: '今天',
  //     },
  //     firstDay: 0,
  //     events: days,
  //     titleFormat: 'YYYY MMMM',
  //     validRange: {
  //       start: `${new Date().getFullYear()}-01-01`,
  //       end: `${new Date().getFullYear() + 1}-01-01`
  //     },
  //     dayClick: (date, jsEvent, view) => {
  //       this.dayClick({
  //         date,
  //         jsEvent,
  //         view
  //       });
  //     }
  //   };
  //   // $(this.calendar.nativeElement).fullCalendar(this.options);
  //   // setTimeout(() => {
  //   //   $(this.calendar.nativeElement).fullCalendar(this.options);
  //   // }, 3000);
  // }

  // dayClick(data) {
  //   const date = moment(data.date).format('YYYY-MM-DD');
  //   this.router.navigate(['/planned-immunity/plan/edit', date, 'jm']);
  // }

  getDays() {
    // this.planService.getDays()
    //   .subscribe(res => {
    //     if (res.code === 0 && res.data) {
    //       console.log(res.data);
    //       this.setCalendar(res.data);
    //   }
    // });
    // this.setCalendar([{start: '2017-09-12', title: '未设置特殊日期'}]);
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

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  handleDayClick(date) {
    console.log(moment(date).format('YYYY-MM-DD'));
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

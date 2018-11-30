import { Component, Inject, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.module';
import { DialogEdit } from '../../../libs/dmodal/dialog.entity';
import { FormCheckbox } from '../../../libs/dform/_entity/form-checkbox';
import { HintDialog } from '../../../libs/dmodal/dialog.module';

@Component({
  selector: 'app-plan-ageperiod',
  templateUrl: './ageperiod.component.html',
  styleUrls: ['../../common/plan-common.component.scss']
})
export class AgePeriodComponent implements OnInit, OnChanges {
  @Input() orgId: any;
  @Input() vaccineSchedule: any = defaultVaccineList;
  @Output() save: EventEmitter<any> = new EventEmitter();
  vaccineList: any;
  vaccineList2: any;

  constructor(
    @Inject('action') private action,
    @Inject('plan') private planService,
    @Inject('auth') private auth,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.planService.getVaccine().subscribe(res => {
      if (res && res.code == 0 && res.data && res.data.content) {
        this.vaccineList = res.data.content.filter(obj => obj && obj.type == 1);
        this.vaccineList2 = res.data.content.filter(obj => obj && obj.type == 2);
      }
    });
  }

  ngOnChanges() {
    // console.log(this.orgId);
  }

  getDefaultShow(monthAges, type) {
    const name = monthAges.filter(obj => obj && obj.type == type).map(obj => obj && obj.name);
    const nameall = name.filter(n => n === '全月龄');
    return nameall.length !== 0 ? nameall[0] : name.join(',');
  }

  editVaccine(week, ampm, monthAges) {
    let defalutValue1 = [];
    let defalutValue2 = [];
    defalutValue1 = monthAges.filter(obj => obj && obj.type == 1).map(data => data && data.id);
    defalutValue2 = monthAges.filter(obj => obj && obj.type == 2).map(data => data && data.id);
    const option: DialogEdit = new DialogEdit({
      title: `维护${this.renderWeek(week)}${this.renderAmPm(ampm)}的体检`,
      form: [
        new FormCheckbox({
          key: 'local' + week + ampm,
          label: '本地儿童体检时段',
          value: defalutValue1,
          allCheckedName: '全月龄',
          // options: this.vaccineList
          options: this.vaccineList.filter(obj => obj && obj.name !== '全月龄')
        }),
        new FormCheckbox({
          key: 'nonlocal' + week + ampm,
          label: '外地儿童体检时段',
          value: defalutValue2,
          allCheckedName: '全月龄',
          // options: this.vaccineList2
          options: this.vaccineList2.filter(obj => obj && obj.name !== '全月龄')
        }),
      ]
    });

    const editDialog = EditDialog(option, this.dialog);
    editDialog.afterClosed().subscribe(data => {
      // console.log(data);
      if (data && !((data['local' + week + ampm] && data['local' + week + ampm].length !== 0) || (data['nonlocal' + week + ampm] && data['nonlocal' + week + ampm].length !== 0))) {
        HintDialog('请选择儿童体检时段', this.dialog);
      } else if (data && data['local' + week + ampm] && data['nonlocal' + week + ampm]) {
        this.saveVaccine(week, ampm, data['local' + week + ampm], data['nonlocal' + week + ampm]);
      }
    });
  }

  saveVaccine(week, ampm, ids, ids2) {
    // console.log(ids);
    let vaccineId1 = '';
    let vaccineId2 = '';
    if ((this.vaccineList.length - 1) === ids.length) {
      vaccineId1 = this.vaccineList.map(obj => obj && obj.id).join(',');
    } else {
      vaccineId1 = ids.join(',');
    }
    if ((this.vaccineList2.length - 1) === ids2.length) {
      vaccineId2 = this.vaccineList2.map(obj => obj && obj.id).join(',');
    } else {
      vaccineId2 = ids2.join(',');
    }
    const saveData = [{
      week: week,
      amPm: ampm,
      monthage_id: vaccineId1 + ',' + vaccineId2
    }];
    // console.log(saveData);
    this.planService.saveVaccine(saveData, this.orgId)
      .subscribe(res => {
        // console.log(res);
        if (res.code === 0) {
          this.save.emit();
        }
      });
  }

  renderWeek(key) {
    switch (key) {
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      case 7:
        return '周日';
      default:
        return '';
    }
  }

  renderAmPm(key) {
    switch (key) {
      case 'am':
        return '上午';
      case 'pm':
        return '下午';
      default:
        return '';
    }
  }
}

const defaultVaccineList = [
  [
    {
      'week': 1,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 2,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 3,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 4,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 5,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 6,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 7,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': ''
    }
  ],
  [
    {
      'week': 1,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 2,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 3,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 4,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 5,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 6,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    },
    {
      'week': 7,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': ''
    }
  ]
];

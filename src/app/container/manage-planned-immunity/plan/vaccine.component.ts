import { Component, Inject, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.module';
import { DialogEdit } from '../../../libs/dmodal/dialog.entity';
import { FormCheckbox } from '../../../libs/dform/_entity/form-checkbox';
import { HintDialog } from '../../../libs/dmodal/dialog.module';

@Component({
  selector: 'app-plan-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['../../common/plan-common.component.scss']
})
export class VaccineComponent implements OnInit, OnChanges {
  @Input() orgId: any;
  @Input() vaccineSchedule: any = defaultVaccineList;
  @Output() save: EventEmitter<any> = new EventEmitter();
  vaccineList: any;

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
        this.vaccineList = res.data.content;
      }
    });
  }

  ngOnChanges() {
    console.log(this.orgId);
  }

  editVaccine(week, ampm) {
    const option: DialogEdit = new DialogEdit({
      title: `维护${this.renderWeek(week)}${this.renderAmPm(ampm)}的疫苗`,
      form: [
        new FormCheckbox({
          key: 'vaccine' + week + ampm,
          label: '请选择疫苗',
          value: [],
          options: [...this.vaccineList]
        })
      ]
    });

    const editDialog = EditDialog(option, this.dialog);
    editDialog.afterClosed().subscribe(data => {
      console.log(data);
      if (data && data['vaccine' + week + ampm] && data['vaccine' + week + ampm].length === 0) {
        HintDialog('请选择疫苗', this.dialog);
      } else if (data && data['vaccine' + week + ampm]) {
        this.saveVaccine(week, ampm, data['vaccine' + week + ampm]);
      }
    });
  }

  saveVaccine(week, ampm, ids) {
    console.log(ids);
    let vaccineId = '';
    if (this.vaccineList.length === ids.length) {
      vaccineId = '0';
    } else {
      vaccineId = ids.join(',');
    }
    const saveData = [{
      week: week,
      amPm: ampm,
      vaccine_id: vaccineId
    }];
    console.log(saveData);
    this.planService.saveVaccine(saveData, this.orgId)
      .subscribe(res => {
        console.log(res);
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
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 2,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 3,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 4,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 5,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 6,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 7,
      'amPm': 'am',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    }
  ],
  [
    {
      'week': 1,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 2,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 3,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 4,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 5,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 6,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    },
    {
      'week': 7,
      'amPm': 'pm',
      'workState': false,
      'vaccineNames': '疫苗名称,疫苗名称,疫苗名称,疫苗名称'
    }
  ]
];

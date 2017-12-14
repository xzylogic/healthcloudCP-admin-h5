import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { HintDialog, MessageDialog } from '../../../../libs/dmodal/dialog.component';
import { MatDialog } from '@angular/material';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-receive-folic-acid-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  id: string;
  data: any;
  survey: any;
  status: string;
  reason = '';
  reasonRadio = '';

  constructor(
    @Inject('appointment') private appointmentService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.id = route.id;
        this.getDetail(route.id);
        this.getSurvey(route.id);
      }
    });
  }

  getDetail(id) {
    this.appointmentService.getDetail(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.data = res.data;
          this.status = res.data.checked;
          this.reason = res.data.noCheckReason || '';
        }
      });
  }

  getSurvey(id) {
    this.appointmentService.getSurvey(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.survey = res.data;
        }
      });
  }

  saveStatus() {
    let msg = `是否`;
    let reason = '';
    if (this.status == '1') {
      msg += '通过审核？';
      this.reason = '';
      this.reasonRadio = '';
    }
    if (this.status == '2') {
      msg += '不通过审核？';
      reason = `不通过原因：${this.reasonRadio == '0' ? this.reason : this.reasonRadio}`;
    }
    MessageDialog(msg, reason, this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.save(this.status, this.reasonRadio == '0' ? this.reason : this.reasonRadio);
        }
      });
  }

  cancel() {
    this.status = '';
    this.reason = '';
    this.reasonRadio = '';
  }

  save(status, reason) {
    this.appointmentService.saveDetail(this.id, status, reason)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '操作成功！', this.dialog);
          this.cancel();
          this.getDetail(this.id);
        } else if (res.code === 1001) {
          HintDialog(res.msg || '操作失败～', this.dialog);
          this.cancel();
          this.getDetail(this.id);
        } else {
          HintDialog(res.msg || '操作失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  printSurvey(survey) {
    const my_window = window.open('print', '_blank');
    my_window.document.write('<html><head>');
    my_window.document.write(window.document.getElementsByTagName('head')[0].innerHTML);
    my_window.document.write('</head><body>');
    my_window.document.write(survey.innerHTML);
    my_window.document.write('</body></html>');
    // setTimeout(() => {
    my_window.document.close();
    my_window.focus();
    my_window.print();
    // my_window.close();
    // }, 300);
  }
}

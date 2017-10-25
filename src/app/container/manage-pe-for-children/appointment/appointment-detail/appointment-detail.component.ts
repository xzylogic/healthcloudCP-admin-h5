import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { HintDialog, MessageDialog } from '../../../../libs/dmodal/dialog.component';
import { MdDialog } from '@angular/material';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-pe-for-children-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  id: string;
  data: any;
  status: string;
  reason = '';
  reasonRadio = '';

  constructor(
    @Inject('appointment') private appointmentService,
    private dialog: MdDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.appointmentService.setAppointmentDetailConfig();
    this.route.params.subscribe(route => {
      if (route.id) {
        this.id = route.id;
        this.getDetail(route.id);
      }
    });
  }

  getDetail(id) {
    this.appointmentService.getDetail(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.data = res.data;
          this.status = res.data.status;
          this.reason = res.data.reason;
        }
      });
  }

  saveStatus() {
    let msg = `是否设置${this.data && this.data.childDto && this.data.childDto.name || ''}`;
    let reason = '';
    if (this.status == '1') {
      msg += '正常接种？';
      this.reason = '';
      this.reasonRadio = '';
    }
    if (this.status == '3') {
      msg += '接种取消？';
      reason = `取消原因：${this.reasonRadio == '0' ? this.reason : this.reasonRadio}`;
    }
    if (this.status == '4') {
      msg += '接种爽约？';
      this.reason = '';
      this.reasonRadio = '';
    }
    MessageDialog(msg, reason, this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.save(this.status, this.reasonRadio == '0' ? this.reason : this.reasonRadio);
        }
      });
  }

  save(status, reason) {
    this.appointmentService.saveDetail(this.id, status, reason)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '操作成功！', this.dialog);
          this.getDetail(this.id);
        } else {
          HintDialog(res.msg || '操作失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}

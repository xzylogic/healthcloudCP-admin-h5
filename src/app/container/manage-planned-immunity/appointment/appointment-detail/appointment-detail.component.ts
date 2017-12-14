import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { HintDialog, MessageDialog } from '../../../../libs/dmodal/dialog.component';
import { MatDialog } from '@angular/material';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-planned-immunity-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  routerSubscribe: any;
  detailSubscribe: any;
  updateSubscribe: any;
  dialogSubscribe: any;
  containerConfig: ContainerConfig;
  id: string;
  data: any;
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
    this.routerSubscribe = this.route.params.subscribe(route => {
      if (route.id && route.menu) {
        this.containerConfig = this.appointmentService.setAppointmentDetailConfig(route.menu);
        this.id = route.id;
        this.getDetail(route.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscribe) {
      this.routerSubscribe.unsubscribe();
    }
    if (this.detailSubscribe) {
      this.detailSubscribe.unsubscribe();
    }
    if (this.updateSubscribe) {
      this.updateSubscribe.unsubscribe();
    }
    if (this.dialogSubscribe) {
      this.dialogSubscribe.unsubscribe();
    }
  }

  getDetail(id) {
    this.detailSubscribe = this.appointmentService.getDetail(id)
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
    this.dialogSubscribe = MessageDialog(msg, reason, this.dialog).afterClosed()
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
    this.updateSubscribe = this.appointmentService.saveDetail(this.id, status, reason)
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
}

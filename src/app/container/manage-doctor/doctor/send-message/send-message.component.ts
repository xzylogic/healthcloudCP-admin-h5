import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DoctorService } from '../_service/doctor.service';
import { ERRMSG } from '../../../_store/static';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  containerConfig: ContainerConfig;

  auditedTable: TableOption;
  selectedItems: Array<any> = [];

  constructor(
    private doctorService: DoctorService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorMessageConfig();
    this.auditedTable = new TableOption();
    this.getAuditedDoctors(0);
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.reset(page);
    this.doctorService.getAuditedDoctors(
      this.auditedTable.queryKey, page, 12)
      .subscribe(res => {
        this.auditedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditedTable.totalPage = res.data.totalPages;
          this.auditedTable.lists = res.data.content;
        } else {
          this.auditedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.auditedTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  selectItem(item) {
    let target = true;
    this.selectedItems.forEach(obj => {
      if (item.id === obj.id) {
        target = false;
      }
    });
    if (target) {
      this.selectedItems.push(item);
    }
  }

  removeItem(item) {
    let index;
    this.selectedItems.forEach((obj, i) => {
      if (item.id === obj.id) {
        index = i;
      }
    });
    this.selectedItems.splice(index, 1);
  }

  onSubmit(value) {
    if (this.selectedItems.length !== 0) {
      const ids = [];
      this.selectedItems.forEach(obj => {
        ids.push(obj.id);
      });
      this.doctorService.sendMessage({
        content: value.message,
        doctorIds: ids
      }).subscribe(
        res => {
          if (res.code === 0) {
            HintDialog('短信发送成功', this.dialog);
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    }
  }
}

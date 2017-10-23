import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  containerConfig: ContainerConfig;
  messageTable: TableOption;
  allChecked = false;

  constructor(
    @Inject('message') private messageService,
    private router: Router,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.messageService.setMessageConfig();
    this.messageTable = new TableOption({
      ifPage: true
    });
    this.getMessage(0);
  }

  getMessage(page) {
    this.messageTable.reset(page);
    this.messageService.getMessage(page)
      .subscribe(res => {
        this.messageTable.loading = false;
        if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
          this.messageTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.data.content && res.code === 0) {
          this.messageTable.totalPage = res.data.extras.pageCount;
          this.messageTable.lists = res.data.content;
        } else {
          this.messageTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.messageTable.loading = false;
        console.log(err);
        this.messageTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getAllChecked() {
    this.messageTable.lists.forEach(obj => {
      obj.checked = this.allChecked;
    });
  }

  delSelected() {
    let list = [];
    this.messageTable.lists.forEach((obj => {
      if (obj.checked) {
        list.push(obj.id);
      }
    }));
    HintDialog('确定删除所选消息？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.delMessage(list);
        }
      });
  }

  readSelected() {
    let list = [];
    this.messageTable.lists.forEach((obj => {
      if (obj.checked) {
        list.push(obj.id);
      }
    }));
    HintDialog('确定设置所选消息为已读？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.readMessage(list.join(','));
        }
      });
  }

  gotoHandle(id) {
    HintDialog('确定删除消息？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.delMessage([id]);
        }
      });
  }

  delMessage(id) {
    this.messageService.delMessage(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('删除成功！', this.dialog);
          this.getMessage(0);
        } else {
          HintDialog(res.msg || '删除失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  readMessage(id) {
    this.messageService.readMessage(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('设置成功！', this.dialog);
          this.getMessage(0);
        } else {
          HintDialog(res.msg || '设置失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  readMessageS(id) {
    this.messageService.readMessage(id)
      .subscribe(res => {
        if (res.code === 0) {
          console.log('success');
        } else {
          console.log('error');
        }
      }, err => {
        console.log(err);
      });
  }

  gotoDetail(type, id) {
    if (type == 7) {
      this.readMessageS(id);
      this.router.navigate(['/mac-database/appointment/detail', id]);
    }
    if (type == 1) {
      this.readMessageS(id);
      this.router.navigate(['/planned-immunity/appointment/detail', id]);
    }
    if (type == 2) {
      this.readMessageS(id);
      this.router.navigate(['/pe-for-children/appointment/detail', id]);
    }
    if (type == 3) {
      this.readMessageS(id);
      this.router.navigate(['/receive-folic-acid/appointment/detail', id]);
    }
  }
}

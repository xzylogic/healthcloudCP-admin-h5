import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [`
    .form-content {
      padding: 15px 15px 0 15px;
    }
  `]
})
export class UpdateComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  permission = false;
  formIOS: any;
  formAndroid: any;

  hintDialog: any;

  constructor(
    @Inject('auth') private auth,
    @Inject('update') private updateService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.updateService.setUpdateConfig();
    this.route.params.subscribe(route => {
      if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
        this.permission = true;
      }
      this.getInitialValue();
    });
  }

  ngOnDestroy() {
    if (this.hintDialog) {
      this.hintDialog.unsubscribe();
    }
  }

  getInitialValue() {
    const getIOS = this.updateService.getUpdate('app.common.appUpdate.ios');
    const getAndroid = this.updateService.getUpdate('app.common.appUpdate');
    Observable.forkJoin([getIOS, getAndroid]).subscribe(
      (res: Array<any>) => {
        console.log(res);
        if (res[0].code == 0 && res[0].data && res[0].data.data) {
          this.formIOS = new UpdateEntity(JSON.parse(res[0].data.data));
        }
        if (res[1].code == 0 && res[1].data && res[1].data.data) {
          this.formAndroid = new UpdateEntity(JSON.parse(res[1].data.data));
        }
      }, err => {
        console.log(err);
        this.formIOS = new UpdateEntity();
        this.formAndroid = new UpdateEntity();
      });
  }

  getValues(data, type) {
    const saveData = new UpdateSaveEntity(data, type);
    this.hintDialog = HintDialog('是否更新版本升级信息？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key == 'confirm') {
          this.updateService.saveUpdate(saveData).subscribe(res => {
            if (res.code == 0) {
              HintDialog(res.msg || '保存成功！', this.dialog);
            } else {
              HintDialog(res.msg || '保存失败！', this.dialog);
            }
          }, err => {
            HintDialog('网络链接失败，请重试！', this.dialog);
            throw new Error(err);
          });
        }
      });
  }
}

class UpdateEntity {
  lastVersion: string;
  downloadUrl: string;
  iosDownloadUrl: string;
  updateMsg: string;
  enforceUpdateA: string;
  enforceUpdateB: string;
  enforceUpdate: string;
  forceA: string;
  forceB: string;

  constructor(obj?: UpdateEntity) {
    this.lastVersion = obj && obj.lastVersion || '';
    this.downloadUrl = obj && obj.downloadUrl || '';
    this.iosDownloadUrl = obj && obj.iosDownloadUrl || '';
    this.updateMsg = obj && obj.updateMsg || '';
    this.enforceUpdate = obj && obj.enforceUpdate || '';
    this.forceA = obj && obj.enforceUpdate ? '2' : '1';
    this.forceB = obj && obj.enforceUpdate ? '2' : '1';
    this.enforceUpdateA = obj && obj.enforceUpdate ? obj.enforceUpdate.split(',')[0] : '';
    this.enforceUpdateB = obj && obj.enforceUpdate ? obj.enforceUpdate.split(',')[1] : '';
  }
}

class UpdateSaveEntity {
  data: string;
  del_flag: string;
  discrete: string;
  key_word: string;
  main_area: string;
  remark: string;

  constructor(obj: UpdateEntity, type: string = 'IOS') {
    this.data = JSON.stringify(<UpdateEntity>{
      lastVersion: obj.lastVersion,
      downloadUrl: obj.downloadUrl || '',
      iosDownloadUrl: obj.iosDownloadUrl || '',
      updateMsg: obj.updateMsg,
      enforceUpdate: obj.forceA == 2 || obj.forceB == 2 ? `${obj.enforceUpdateA},${obj.enforceUpdateB}` : ''
    });
    this.del_flag = '0';
    this.discrete = '0';
    this.key_word = type == 'IOS' ? 'app.common.appUpdate.ios' : 'app.common.appUpdate';
    this.main_area = '3101';
    this.remark = '';
  }
}

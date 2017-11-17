import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit, OnDestroy {
  paramsMenu: any;
  id: any;

  subscribeRoute: any;
  subscribeInit: any;
  subscribeSave: any;
  subscribeDialog: any;

  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;

  constructor(
    @Inject('banner') private bannerService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query): any => ({route, query})
    ).subscribe(res => {
      if (res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.bannerService.setBannerEditConfig(true);
        this.getInit(res.query.id);
      } else {
        this.containerConfig = this.bannerService.setBannerEditConfig(false);
        this.config = this.bannerService.setBannerForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeInit) {
      this.subscribeInit.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
  }

  getInit(id) {
    this.subscribeInit = this.bannerService.getBanner(id)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          res.data.range = moment(res.data.startTime || new Date()).format('YYYY-MM-DD HH:mm:ss') +
            ' - ' + moment(res.data.endTime || new Date()).format('YYYY-MM-DD HH:mm:ss');
          this.config = this.bannerService.setBannerForm(res.data);
          this.form = this.fcs.toFormGroup(this.config);
          this.cdr.detectChanges();
        }
      });
  }

  getValues(data) {
    const formData: any = {};
    formData.mainTitle = data.mainTitle;
    formData.hoplink = data.hoplink;
    formData.imgUrl = data.imgUrl;
    formData.delFlag = data.delFlag;
    formData.sequence = data.sequence;
    formData.adcode = 0;
    formData.startTime = data.range.split(' - ')[0];
    formData.endTime = data.range.split(' - ')[1];
    if (this.id) {
      formData.id = this.id;
    }
    this.subscribeSave = this.bannerService.saveBanner(formData)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed()
            .subscribe(() => {
              this.router.navigate(['/banner', this.paramsMenu]);
            });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}

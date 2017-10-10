import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import * as moment from 'moment';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  id: any;
  config: any;

  constructor(
    @Inject('banner') private bannerService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private router: Router,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.containerConfig = this.bannerService.setBannerEditConfig(true);
        this.getInit(params.id);
      } else {
        this.containerConfig = this.bannerService.setBannerEditConfig(false);
        this.config = this.bannerService.setBannerForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
      }
    });
  }

  getInit(id) {
    this.bannerService.getBanner(id)
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
    this.bannerService.saveBanner(formData)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/banner']);
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

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActivatedRoute } from '@angular/router';
import { TableOption } from '../../../libs/dtable/dtable.entity';

@Component({
  selector: 'app-health-file',
  templateUrl: './health-file.component.html',
  styleUrls: ['./health-file.component.scss']
})
export class HealthFileComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  personcard: string;
  basicInfo: any;
  hospitalizationInfo: TableOption;
  medicalHistoryInfo: any;
  outpatientInfo: TableOption;

  routerSubscribe: any;

  constructor(
    @Inject('healthfile') private healthFileService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.healthFileService.setHealthFileConfig();
    this.routerSubscribe = this.route.params.subscribe(route => {
      if (route.id) {
        this.personcard = route.id;
        this.getBasicInfo(this.personcard);
        this.getHospitalizationInfo(this.personcard);
        this.getMedicalHistoryInfo(this.personcard);
        this.getOutpatientInfo(this.personcard);
      }
    });
    this.hospitalizationInfo = new TableOption({
      titles: this.healthFileService.setHospitalizationTitles(),
      ifPage: false
    });
    this.outpatientInfo = new TableOption({
      titles: this.healthFileService.setOutpatientTitles(),
      ifPage: false
    });
  }

  ngOnDestroy() {
    if (this.routerSubscribe) {
      this.routerSubscribe.unsubscribe();
    }
  }

  getBasicInfo(card) {
    this.healthFileService.getBasicInfo(card)
      .subscribe(res => {
        console.log(res);
        if (res.code === 0 && res.data) {
          this.basicInfo = res.data;
        }
      });
  }

  getHospitalizationInfo(card) {
    this.healthFileService.getHospitalizationInfo(card)
      .subscribe(res => {
        console.log(res);
        if (res.code === 0 && res.data && res.data.content) {
          this.hospitalizationInfo.lists = res.data.content;
        }
      }, err => {
        console.log(err);
      });
  }

  getMedicalHistoryInfo(card) {
    this.healthFileService.getMedicalHistoryInfo(card)
      .subscribe(res => {
        console.log(res);
        if (res.code === 0 && res.data && res.data.content) {
          this.medicalHistoryInfo = res.data.content;
        }
      }, err => {
        console.log(err);
      });
  }

  getOutpatientInfo(card) {
    this.healthFileService.getOutpatientInfo(card)
      .subscribe(res => {
        console.log(res);
        if (res.code === 0 && res.data && res.data.content) {
          this.outpatientInfo.lists = res.data.content;
        }
      }, err => {
        console.log(err);
      });
  }

  gotoHandle(value) {
    console.log(value);
  }
}

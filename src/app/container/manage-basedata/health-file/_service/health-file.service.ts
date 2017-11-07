import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getBasicInfo: '/api/healthRecord/basicInfo',
  getHospitalizationInfo: '/api/healthRecord/hospitalizationInfo',
  getMedicalHistoryInfo: '/api/healthRecord/medicalHistoryInfo',
  getOutpatientInfo: '/api/healthRecord/outpatientInfo',
};

@Injectable()
export class HealthFileService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  getBasicInfo(card) {
    return this.http.get(`${this.app.base}json/health1.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getBasicInfo}?personcard=${card}`);
  }

  getHospitalizationInfo(card) {
    return this.http.get(`${this.app.base}json/health3.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getHospitalizationInfo}?personcard=${card}`);
  }

  getMedicalHistoryInfo(card) {
    return this.http.get(`${this.app.base}json/health4.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getMedicalHistoryInfo}?personcard=${card}`);
  }

  getOutpatientInfo(card) {
    return this.http.get(`${this.app.base}json/health2.json`);
    // return this.http.get(`${this.app.api_url}${PATH.getOutpatientInfo}?personcard=${card}`);
  }

  setHealthFileConfig() {
    return new ContainerConfig({
      title: '健康档案',
      subTitle: '健康档案详情',
      ifHome: true,
      homeRouter: '/health-file'
    });
  }

  setOutpatientTitles() {
    return [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '就诊日期',
        key: 'time'
      }),
      new TableTitle({
        name: '就诊医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '就诊类型',
        key: 'outpatientType',
        controlType: ControlType.pipe,
        option: {
          key: [1, 2, 3],
          value: ['专家门诊', '普通门诊', '体检']
        }
      }),
      new TableTitle({
        name: '诊断名称',
        key: 'diagnosis'
      }),
      // new TableTitle({
      //   name: '操作',
      //   key: '',
      //   controlType: ControlType.buttons,
      //   option: [{
      //     key: 'edit',
      //     name: ''
      //   }]
      // }),
    ];
  }

  setHospitalizationTitles() {
    return [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '入院日期',
        key: 'hospitalizationTime'
      }),
      new TableTitle({
        name: '出院日期',
        key: 'leaveHospitalTime'
      }),
      new TableTitle({
        name: '就诊医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '科室',
        key: 'department'
      }),
      new TableTitle({
        name: '诊断名称',
        key: 'diagnosis'
      }),
      // new TableTitle({
      //   name: '操作',
      //   key: '',
      //   controlType: ControlType.buttons,
      //   option: [{
      //     key: 'edit',
      //     name: ''
      //   }]
      // }),
    ];
  }

}

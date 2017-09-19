import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  getBanners: '/api/imagetext/findImageTextByAdcode',
  getBanner: '/api/imagetext/findImageTextById',
  saveBanner: '/api/imagetext/saveImageText'
};

@Injectable()
export class BannerService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  getBanners(page, size, adcode, start, end) {
    const query: any = {};
    if (adcode) {
      query.adcode = adcode;
    }
    return this.http.post(`${this.app.api_url}${PATH.getBanners}`, {
      number: page + 1,
      size: size,
      parameter: query
    });
  }

  getBanner(id) {
    return this.http.get(`${this.app.api_url}${PATH.getBanner}?id=${id}`);
  }

  saveBanner(data) {
    return this.http.post(`${this.app.api_url}${PATH.saveBanner}`, data);
  }

  setBannerConfig() {
    return new ContainerConfig({
      title: '广告管理',
      subTitle: 'banner设置',
      ifHome: true,
      homeRouter: '/banner'
    });
  }

  setBannerEditConfig(flag) {
    return new ContainerConfig({
      title: '广告管理',
      subTitle: flag ? '编辑banner' : '新增banner',
      ifHome: false,
      homeRouter: '/banner'
    });
  }

  setBannerTable() {
    return [
      new TableTitle({
        key: 'id',
        name: '排序',
        controlType: ControlType.index
      }),
      new TableTitle({
        key: 'mainTitle',
        name: '主题'
      }),
      new TableTitle({
        key: 'imgUrl',
        name: '图片',
        controlType: ControlType.image
      }),
      new TableTitle({
        key: 'hoplink',
        name: '跳转地址'
      }),
      new TableTitle({
        key: 'startTime',
        name: '显示开始时间'
      }),
      new TableTitle({
        key: 'endTime',
        name: '显示结束时间'
      }),
      new TableTitle({
        key: 'status',
        name: '是否显示'
      }),
      new TableTitle({
        key: '',
        name: '操作',
        controlType: ControlType.buttons,
        option: [{
          key: 'edit',
          name: '编辑'
        }, {
          key: 'statusName',
          name: ''
        }]
      }),
    ];
  }
}

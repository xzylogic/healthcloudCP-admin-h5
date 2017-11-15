import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormDatetime } from '../../../../libs/dform/_entity/form-datetime';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormFile } from '../../../../libs/dform/_entity/form-file';

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

  getBanners(page, size, delFlag, start, end) {
    const query: any = {};
    if (delFlag) {
      query.delFlag = delFlag;
    }
    if (start && end) {
      query.startTime = start;
      query.endTime = end;
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
      homeRouter: '/banner',
      back: true
    });
  }

  setBannerTable(flag) {
    const Titles = [
      new TableTitle({
        key: 'sequence',
        name: '排序',
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
        key: 'delFlag',
        name: '是否显示',
        controlType: ControlType.pipe,
        option: {
          key: [0, 1],
          value: ['显示', '不显示']
        }
      })
    ];
    if (flag) {
      Titles.push(
        new TableTitle({
          key: '',
          name: '操作',
          controlType: ControlType.buttons,
          pipe: {
            key: [1, 0],
            value: ['显示', '不显示']
          },
          option: [{
            key: 'edit',
            name: '编辑'
          }, {
            key: 'delFlag',
            name: ''
          }]
        }));
    }
    return Titles;
  }

  setBannerForm(data?): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormFile({
        key: 'imgUrl',
        label: '图片(请上传不大于150KB的JPG或者PNG图片，建议比例1：3)',
        value: data && data.imgUrl || '',
        required: true,
        url: '',
        size: 150,
        errMsg: '请添加图片'
      })
    );
    forms.push(
      new FormText({
        key: 'mainTitle',
        label: '标题',
        value: data && data.mainTitle || '',
        required: true,
        errMsg: '请填写广告标题'
      })
    );
    forms.push(
      new FormText({
        key: 'hoplink',
        label: '广告跳转地址',
        value: data && data.hoplink || '',
        required: true,
        errMsg: '请填写广告跳转地址'
      })
    );
    forms.push(
      new FormDatetime({
        key: 'range',
        label: '显示时间段',
        value: data && data.range || '',
        required: true,
        options: 'range'
      })
    );
    forms.push(
      new FormRadio({
        key: 'delFlag',
        label: '是否显示',
        value: data && (data.delFlag == 0 ? data.delFlag : data.delFlag || ''),
        required: true,
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }]
      })
    );
    forms.push(
      new FormText({
        key: 'sequence',
        label: '排序',
        value: data && data.sequence || '',
        required: true,
        pattern: `^[0-9]*$`,
        errMsg: '请填写正确的排序（非负整数）'
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

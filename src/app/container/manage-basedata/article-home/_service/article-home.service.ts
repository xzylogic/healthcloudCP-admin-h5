import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormDatetime } from '../../../../libs/dform/_entity/form-datetime';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';

const PATH = {
  getArticleTitle: '/api/article/queryArticleByTitleName',
  getHomeArticles: '/home/article/list',
  getHomeArticle: '/home/article/detail',
  saveHomeArticle: '/home/article/saveOrupdate',
  changeStatus: '/home/article/updateStatusById'
};

@Injectable()
export class ArticleHomeService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http,
  ) {
  }

  getArticleTitle(title) {
    return this.http.get(`${this.app.api_url}${PATH.getArticleTitle}?title=${title}`);
  }

  getHomeArticles(page, size, title, status) {
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (title) {
      query.title = title;
    }
    return this.http.post(`${this.app.api_url}${PATH.getHomeArticles}`, {
      number: page + 1,
      size: size,
      parameter: query
    });
  }

  getHomeArticle(id) {
    return this.http.get(`${this.app.api_url}${PATH.getHomeArticle}?id=${id}`);
  }

  changeStatus(id, status, menu) {
    return this.http.get(`${this.app.api_url}${PATH.changeStatus}?id=${id}&isVisable=${status}&menuId=${menu}`);
  }

  saveHomeArticle(data, menu) {
    return this.http.post(`${this.app.api_url}${PATH.saveHomeArticle}?menuId=${menu}`, data);
  }

  setArticleHomeConfig() {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '首页资讯',
      ifHome: true,
      homeRouter: '/article-home'
    });
  }

  setArticleHomeEditConfig(flag) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: flag ? '编辑首页资讯' : '新增首页资讯',
      ifHome: false,
      homeRouter: '/article-home',
      back: true
    });
  }

  setArticleHomeTable(flag) {
    const Titles = [
      new TableTitle({
        key: 'rank',
        name: '排序'
      }),
      new TableTitle({
        key: 'title',
        name: '文章标题'
      }),
      new TableTitle({
        key: 'articleId',
        name: '文章ID'
      }),
      new TableTitle({
        key: 'startTime',
        name: '开始时间段',
      }),
      new TableTitle({
        key: 'endTime',
        name: '结束时间段',
      }),
      // new TableTitle({
      //   key: 'isRecommend',
      //   name: '是否推荐',
      //   controlType: ControlType.pipe,
      //   option: {
      //     key: [1, 0],
      //     value: ['推荐', '不推荐']
      //   }
      // }),
      new TableTitle({
        key: 'status',
        name: '时间状态',
        controlType: ControlType.pipe,
        option: {
          key: [1, 2, 3],
          value: ['未开始', '进行中', '已结束']
        }
      }),
      new TableTitle({
        key: 'isVisable',
        name: '状态',
        controlType: ControlType.pipe,
        option: {
          key: [1, 0],
          value: ['已下线', '已上线']
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
            key: [0, 1],
            value: ['下线', '上线']
          },
          option: [{
            key: 'edit',
            name: '编辑'
          }, {
            key: 'isVisable',
            name: ''
          }]
        }));
    }
    return Titles;
  }

  setArticleHomeForm(data?): FormBase<any>[] {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'title',
        label: '文章标题',
        value: data && data.title || '',
        errMsg: '请输入文章标题搜索文章'
      })
    );
    forms.push(
      new FormText({
        key: 'articleId',
        label: '文章ID',
        value: data && data.articleId || '',
        readonly: true,
        required: true,
        errMsg: '请在文章标题栏输入文章标题搜索文章'
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
    // forms.push(
    //   new FormRadio({
    //     key: 'isRecommend',
    //     label: '是否推荐',
    //     value: data && (data.isRecommend == 0 ? data.isRecommend : data.isRecommend || ''),
    //     required: true,
    //     options: [{
    //       id: 1,
    //       name: '是'
    //     }, {
    //       id: 0,
    //       name: '否'
    //     }]
    //   })
    // );
    forms.push(
      new FormText({
        key: 'rank',
        label: '文章排序',
        value: data && data.rank || '',
        required: true,
        pattern: `^[0-9]*$`,
        errMsg: '请填写正确的文章排序（非负整数）'
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

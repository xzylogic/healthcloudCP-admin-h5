import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';

const PATH = {
  getArticles: '/api/article/list', // 获取文章列表
  getArticle: '/api/article/info', // 获取文章详情
  saveArticle: '/api/article/saveOrUpdate', // 新增/编辑文章详情
  getClassifies: '/api/article/categoryList', // 获取文章分类列表（不分页）
  getUrlContent: '/api/article/getHtmlByUrl'
};

@Injectable()
export class ArticleService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  /**
   * 获取文章分类列表（默认取启用的数据）
   * isVisable | 0 启用 1 禁用
   */
  getClassifies() {
    return this.http.get(`${this.app.api_url}${PATH.getClassifies}?isVisable=0`);
  }

  getUrlContent(url) {
    return this.http.get(`${this.app.api_url}${PATH.getUrlContent}?url=${url}`);
  }

  /**
   * 获取文章列表数据
   * @param page 当前页码（默认从0开始，接口从1开始，故+1）
   * @param size 每页数据个数（table默认为10）
   * @param title 文章标题
   * @param startTime 开始时间
   * @param endTime 结束时间
   * @param classifyId 文章分类id
   */
  getArticles(page, size, title, startTime, endTime, classifyId) {
    return this.http.post(`${this.app.api_url}${PATH.getArticles}`, {
      number: page + 1,
      size: size,
      parameter: {
        title: title,
        startTime: startTime,
        endTime: endTime,
        categoryId: classifyId.toString()
      }
    });
  }

  /**
   * 获取文章详情
   * @param id
   */
  getArticle(id) {
    return this.http.get(`${this.app.api_url}${PATH.getArticle}?id=${id}`);
  }

  /**
   * 新增/编辑文章详情
   * @param data
   * @param menu
   */
  saveArticle(data, menu) {
    return this.http.post(`${this.app.api_url}${PATH.saveArticle}?menuId=${menu}`, data);
  }

  /**
   * 配置文章库列表页
   * @param menu 菜单id
   * @returns {ContainerConfig}
   */
  setArticleConfig(menu) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: '文章库',
      ifHome: true,
      homeRouter: ['/article', menu]
    });
  }

  /**
   * 配置文章库详情页
   * @param flag | true 编辑 false 新增
   * @returns {ContainerConfig}
   */
  setArticleEditConfig(flag) {
    return new ContainerConfig({
      title: '资讯管理',
      subTitle: flag ? '编辑文章' : '新增文章',
      ifHome: false,
      homeRouter: ['/article'],
      back: true
    });
  }

  /**
   * 配置文章列表title
   * @returns {TableTitle[]}
   */
  setArticleTable(key) {
    let option = [];
    if (key) {
      option = [{
        key: 'edit',
        name: '编辑'
      }, {
        key: 'detail',
        name: '预览'
      }];
    } else {
      option = [{
        key: 'detail',
        name: '预览'
      }];
    }
    return [
      new TableTitle({
        key: 'id',
        name: 'ID'
      }),
      new TableTitle({
        key: 'title',
        name: '文章标题'
      }),
      new TableTitle({
        key: 'categoryName',
        name: '资讯分类'
      }),
      new TableTitle({
        key: 'updateTime',
        name: '更新时间',
        controlType: ControlType.date
      }),
      new TableTitle({
        key: '',
        name: '操作',
        controlType: ControlType.buttons,
        option: option
      }),
    ];
  }

  /**
   * 配置文章编辑表单
   * @param classifyList
   * @param data
   * @returns {FormBase<any>[]}
   */
  setArticleForm(classifyList, data?) {
    const forms: FormBase<any>[] = [];
    if (data && data.id) {
      forms.push(
        new FormHidden({
          key: 'id',
          label: '',
          value: data.id,
          required: true,
          order: 0
        }));
    }

    forms.push(
      new FormText({
        key: 'title',
        label: '文章标题',
        value: data && data.title || '',
        required: true,
        errMsg: '请填写文章标题',
        maxlength: 20,
        order: 1
      })
    );
    forms.push(
      new FormText({
        key: 'brief',
        label: '描述',
        value: data && data.brief || '',
        required: true,
        errMsg: '请填写文章描述',
        maxlength: 30,
        order: 2
      })
    );
    forms.push(
      new FormFile({
        key: 'thumb',
        label: '图片(请上传不大于150KB的JPG或者PNG图片)',
        value: data && data.thumb || '',
        required: true,
        errMsg: '',
        size: 150,
        order: 3
      })
    );
    // forms.push(
    //   new FormFile({
    //     key: 'recommImageUrl',
    //     label: '推荐图片(请上传不大于150KB的JPG或者PNG图片，建议比例1：3)',
    //     value: data && data.recommImageUrl || '',
    //     required: false,
    //     errMsg: '',
    //     size: 150,
    //     order: 4
    //   })
    // );
    forms.push(
      new FormRadio({
        key: 'contentType',
        label: '文章类型',
        value: data && data.contentType || '1',
        options: [{
          id: '1',
          name: '内容'
        }, {
          id: '2',
          name: '链接'
        }],
        order: 5
      })
    );
    forms.push(
      new FormText({
        key: 'contentUrl',
        label: '链接',
        value: data && data.contentUrl || '',
        required: false,
        errMsg: '请填写文章链接',
        isOptional: true,
        optional: {
          key: 'contentType',
          value: '2'
        },
        order: 6
      })
    );
    forms.push(
      new FormEditor({
        key: 'content',
        label: '内容',
        value: data && data.content || '',
        required: false,
        errMsg: '请填写文章内容',
        isOptional: true,
        optional: {
          key: 'contentType',
          value: '1'
        },
        order: 6
      })
    );
    forms.push(
      new FormText({
        key: 'keyword',
        label: '关键字（可输入多个关键字，用逗号分隔）',
        value: data && data.keyword || '',
        required: true,
        errMsg: '请填写关键字',
        order: 7
      })
    );
    forms.push(
      new FormText({
        key: 'author',
        label: '文章作者',
        value: data && data.author || '',
        required: true,
        errMsg: '请填写文章作者',
        order: 8
      })
    );
    forms.push(
      new FormDropdown({
        key: 'categoryId',
        label: '资讯分类',
        value: data && data.categoryId || '',
        required: true,
        options: classifyList,
        errMsg: '请选择资讯分类',
        order: 9
      })
    );
    forms.push(
      new FormText({
        key: 'fakePv',
        label: '预设阅读量',
        value: data && (data.fakePv == 0 ? data.fakePv : data.fakePv || ''),
        required: true,
        errMsg: '请填写正确的预设阅读量（非负整数）',
        pattern: `^[0-9]*$`,
        order: 10
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}

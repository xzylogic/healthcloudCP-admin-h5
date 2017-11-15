import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-pregnancy-interview',
  templateUrl: './pregnancy-interview.component.html'
})
export class PregnancyInterviewComponent implements OnInit {
  containerConfig: ContainerConfig;
  interviewTable: TableOption;
  @select(['pregnancy-interview', 'data']) data: Observable<any>;
  name = '';
  telephone = '';
  period = '';
  status = '';
  centerId = '';
  siteId = '';
  centerList: Array<any>;
  siteList: Array<any>;
  departmentList: Array<any>;
  communityList: Array<any>;
  statusList = [{
    id: '',
    name: '全部'
  }, {
    id: 1,
    name: '待随访'
  }, {
    id: 2,
    name: '在线随访'
  }, {
    id: 3,
    name: '电话随访'
  }];

  periodList = [{
    id: '',
    name: '全部'
  }, {
    id: 1,
    name: '16-20周'
  }, {
    id: 2,
    name: '21-24周'
  }, {
    id: 3,
    name: '28-36周'
  }, {
    id: 4,
    name: '37-40周'
  }, {
    id: 5,
    name: '40周以上'
  }];

  constructor(
    @Inject('action') private action,
    @Inject('interview') private interviewService,
    private router: Router,
    private param: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setPregnancyInterviewConfig();
    this.interviewTable = new TableOption({
      titles: this.interviewService.setTitles(),
      ifPage: true
    });
    this.param.queryParams.subscribe(params => {
      if (params && params.flag) {
        this.data.subscribe(data => {
          if (data) {
            this.name = data.name;
            this.telephone = data.telephone;
            this.period = data.period;
            this.status = data.status;
            this.centerId = data.centerId;
            this.siteId = data.siteId;
            this.getData(data.page);
          } else {
            this.reset();
          }
        });
      } else {
        this.reset();
      }
    });
    this.getCommunityAll();
  }

  reset() {
    this.name = '';
    this.telephone = '';
    this.period = '';
    this.status = '';
    this.centerId = '';
    this.siteId = '';
    this.getCenter(this.communityList);
    this.getSite(this.communityList);
    this.getDepartment(this.communityList);
    this.getData(0);
  }

  search() {
    this.getData(0);
  }

  getData(page) {
    this.interviewTable.reset(page);
    this.interviewService.getData(
      page, this.interviewTable.size,
      this.name, this.telephone,
      this.period, this.status,
      this.siteId || this.centerId
    )
      .subscribe(res => {
        this.interviewTable.loading = false;
        if (res.code == 0 && res.data && res.data.content && res.data.content.length == 0) {
          this.interviewTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code == 0 && res.data && res.data.content && res.data.extras) {
          this.interviewTable.totalPage = res.data.extras.totalPage;
          this.formatData(res.data.content);
          this.interviewTable.lists = res.data.content;
        } else {
          this.interviewTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.interviewTable.loading = false;
        this.interviewTable.errorMessage = ERRMSG.netErrMsg;
        console.log(err);
      });
  }

  formatData(data) {
    if (data && Array.isArray(data)) {
      data.forEach(obj => {
        obj.statusName = obj.status == 1 ? '已随访' : '待随访';
        obj.edit = obj.status == 1 ? '查看' : '登记';
      });
    }
  }

  gotoHandle(res) {
    if (res.key === 'edit') {
      this.action.dataChange('pregnancy-interview', {
        name: this.name,
        telephone: this.telephone,
        period: this.period,
        status: this.status,
        centerId: this.centerId,
        siteId: this.siteId,
        page: this.interviewTable.currentPage
      });
      this.router.navigate(['/pregnancy-interview/detail', res.value.id]);
    }
  }

  getCommunityAll() {
    this.interviewService.getCommunityAll()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.communityList = res.data;
          this.getCenter(res.data);
          this.getSite(res.data);
          this.getDepartment(res.data);
        }
      });
  }

  // 获取中心列表
  getCenter(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 1) {
          center.push(obj);
        }
      });
      this.centerList = center;
    }
  }

  // 获取站点列表
  getSite(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 2) {
          center.push(obj);
        }
      });
      this.siteList = center;
    }
  }

  // 获取部门列表
  getDepartment(list) {
    if (Array.isArray(list)) {
      const center = [];
      list.forEach(obj => {
        if (obj.type == 3) {
          center.push(obj);
        }
      });
      this.departmentList = center;
    }
  }

  centerChange(data) {
    if (data.value) {
      this.siteId = '';
      const site = [{menuId: '', name: '无'}];
      this.communityList.forEach(obj => {
        if (obj.parentId === data.value && obj.type == 2) {
          site.push(obj);
        }
      });
      if (site.length !== 1) {
        site.splice(0, 1);
      }
      this.siteList = site;
    }
  }
}

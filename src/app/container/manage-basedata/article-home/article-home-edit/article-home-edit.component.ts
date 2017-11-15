import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import * as moment from 'moment';

@Component({
  selector: 'app-article-home-edit',
  templateUrl: './article-home-edit.component.html',
  styleUrls: ['./article-home-edit.component.scss']
})
export class ArticleHomeEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  routeSubscribe: any;
  initSubscribe: any;
  detailSubscribe: any;
  saveSubscribe: any;
  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;
  id: any;
  config: any;
  thirdList: Array<any> = [];

  constructor(
    @Inject('home') private homeService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(route => {
      if (route.menu) {
        this.paramsMenu = route.menu;
      }
    });
    this.containerConfig = this.homeService.setArticleHomeEditConfig(false);
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.containerConfig = this.homeService.setArticleHomeEditConfig(true);
        this.getInit(params.id);
      } else {
        this.containerConfig = this.homeService.setArticleHomeEditConfig(false);
        this.config = this.homeService.setArticleHomeForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
      }
    });
    this.searchStream.debounceTime(500).distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(searchText);
      });
  }

  ngOnDestroy() {
    this.form = null;
    if (this.routeSubscribe) {
      this.routeSubscribe.unsubscribe();
    }
    if (this.initSubscribe) {
      this.initSubscribe.unsubscribe();
    }
    if (this.detailSubscribe) {
      this.detailSubscribe.unsubscribe();
    }
    if (this.saveSubscribe) {
      this.saveSubscribe.unsubscribe();
    }
  }

  getInit(id) {
    this.initSubscribe = this.homeService.getHomeArticle(id)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data[0]) {
          res.data[0].range = moment(res.data[0].startTime || new Date()).format('YYYY-MM-DD HH:mm:ss') +
            ' - ' + moment(res.data[0].endTime || new Date()).format('YYYY-MM-DD HH:mm:ss');
          this.config = this.homeService.setArticleHomeForm(res.data[0]);
          this.form = this.fcs.toFormGroup(this.config);
          this.cdr.detectChanges();
        }
      });
  }

  getValidName(name) {
    this.searchStream.next(name);
  }

  loadData(data) {
    this.detailSubscribe = this.homeService.getArticleTitle(data)
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.thirdList = res.data;
        }
      });
  }

  selected(data) {
    this.config[0].value = data.title;
    this.config[1].value = data.id;
    this.thirdList = [];
    this.cdr.detectChanges();
  }

  getValues(data) {
    const formData: any = {};
    formData.articleId = data.articleId;
    formData.rank = data.rank;
    formData.isRecommend = data.isRecommend;
    formData.isVisable = 0;
    formData.startTime = data.range.split(' - ')[0];
    formData.endTime = data.range.split(' - ')[1];
    if (this.id) {
      formData.id = this.id;
    }
    this.saveSubscribe = this.homeService.saveHomeArticle(formData, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/article-home', this.paramsMenu]);
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

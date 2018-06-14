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
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-article-home-edit',
  templateUrl: './article-home-edit.component.html',
  styleUrls: ['./article-home-edit.component.scss']
})
export class ArticleHomeEditComponent implements OnInit, OnDestroy {
  paramsMenu: string;
  id: any;

  subscribeRoute: any;
  subscribeSearch: any;
  subscribeInit: any;
  subscribeDetail: any;
  subscribeDialog: any;
  subscribeSave: any;

  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;
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
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query): any => ({route, query})
    ).subscribe(res => {
      if (res.route && res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.homeService.setArticleHomeEditConfig(true);
        this.getInit(this.id);
      } else {
        this.containerConfig = this.homeService.setArticleHomeEditConfig(false);
        this.config = this.homeService.setArticleHomeForm();
        this.form = this.fcs.toFormGroup(this.config);
        this.cdr.detectChanges();
      }
    });
    this.subscribeSearch = this.searchStream.debounceTime(500).distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(searchText);
      });
  }

  ngOnDestroy() {
    this.form = null;
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeInit) {
      this.subscribeInit.unsubscribe();
    }
    if (this.subscribeSearch) {
      this.subscribeSearch.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
  }

  getInit(id) {
    this.subscribeInit = this.homeService.getHomeArticle(id)
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
    this.subscribeDetail = this.homeService.getArticleTitle(data)
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
    formData.isRecommend = 0;
    formData.isVisable = 0;
    formData.startTime = data.range.split(' - ')[0];
    formData.endTime = data.range.split(' - ')[1];
    if (this.id) {
      formData.id = this.id;
    }
    this.subscribeSave = this.homeService.saveHomeArticle(formData, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed()
            .subscribe(() => {
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

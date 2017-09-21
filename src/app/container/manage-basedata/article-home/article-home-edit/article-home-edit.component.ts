import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-article-home-edit',
  templateUrl: './article-home-edit.component.html',
  styleUrls: ['./article-home-edit.component.scss']
})
export class ArticleHomeEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;
  id: any;
  config: any;
  thirdList: Array<any> = [];

  constructor(
    @Inject('home') private homeService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private router: Router,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
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

  getInit(id) {
    this.homeService.getHomeArticle(id)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data[0]) {
          res.data[0].range = moment(res.data[0].startTime || new Date()).format('YYYY-MM-DD HH:mm:ss') +
            ' - ' + moment(res.data[0].endTime || new Date()).format('YYYY-MM-DD HH:mm:ss');
          console.log(res.data[0]);
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
    this.homeService.getArticleTitle(data)
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
    this.homeService.saveHomeArticle(formData)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/article-home']);
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

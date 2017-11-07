import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-interview',
  templateUrl: './receive-interview.component.html'
})
export class ReceiveInterviewComponent implements OnInit {
  containerConfig: ContainerConfig;
  interviewTable: TableOption;

  constructor(
    @Inject('interview') private interviewService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.interviewService.setReceiveInterviewConfig();
    this.interviewTable = new TableOption({
      titles: this.interviewService.getTitles(),
      ifPage: true
    });
    this.getData(0);
  }

  getData(page) {
    this.interviewTable.reset(page);
    this.interviewService.getDataList(page, this.interviewTable.size)
      .subscribe(res => {
          console.log(res);
          if (res.data && res.totalPages) {
            this.interviewTable.totalPage = res.totalPages;
            this.formatData(res.data);
            this.interviewTable.lists = res.data;
          }
        }
      );
  }

  formatData(data) {
    if (data && Array.isArray(data)) {
      data.forEach(obj => {
        obj.statusName = obj.followStatus == 0 ? '待随访' : '已随访';
        obj.edit = obj.followStatus == 0 ? '登记' : '查看';
      });
    }
  }

  gotoHandle(res) {
    console.log(res);
    this.router.navigate(['/receive-interview/detail', res.value.personcard]);
  }
}

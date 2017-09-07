import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html'
})
export class AccountEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  searchStream: Subject<string> = new Subject<string>();
  form: FormGroup;
  config: any;

  constructor(
    @Inject('account') private accountService,
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.accountService.setAccountEditConfig();
    this.config = this.accountService.setAccountForm();
    this.form = this.fcs.toFormGroup(this.accountService.setAccountForm());
    this.cdr.detectChanges();
    this.searchStream.debounceTime(500).distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(searchText);
      });
  }

  getValues(data) {
    console.log(data);
  }

  getValidName(name) {
    this.searchStream.next(name);
  }

  loadData(data) {
    this.accountService.getValid(data)
      .subscribe(res => {
        console.log(res);
      });
  }
}

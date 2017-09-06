import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DFormControlService } from '../../../../libs/dform/_service/form-control.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html'
})
export class AccountEditComponent implements OnInit {
  containerConfig: ContainerConfig;

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
    console.log(this.accountService.setAccountForm());
    this.cdr.detectChanges();
  }

  getValues(data) {
    console.log(data);
  }

  getValidName(name) {
    console.log(name);
  }
}

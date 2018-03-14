import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(
    @Inject('auth') private auth,
    @Inject('version') private versionService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.versionService.setVersionConfig();

  }

}

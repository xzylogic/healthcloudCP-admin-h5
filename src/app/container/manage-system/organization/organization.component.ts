import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;

  containerConfig: ContainerConfig;
  menuList: any;
  form: any;
  formTwo: any;
  formThree: any;
  title = '';
  flag: number; // 0 添加科室／修改所有 1 添加科室和站点 2 添加中心科室和站点

  constructor(
    @Inject('auth') private auth,
    @Inject('organization') private organizationService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        this.paramsMenu = route.menu;
      }
    });
    this.containerConfig = this.organizationService.setOrganizationConfig();
    this.getMenus();
  }

  getMenus() {
    this.subscribeData = this.organizationService.getMenus()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.menuList = res.data;
          this.offData(this.menuList);
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  offData(data) {
    if (data) {
      data.open = false;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.offData(obj);
        });
      }
    }
  }

  openData(data) {
    if (data) {
      data.open = true;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.openData(obj);
        });
      }
    }
  }

  unActive(data, id) {
    if (data) {
      data.active = data.menuId === id;
      if (data.children && data.children.length !== 0) {
        data.children.forEach(obj => {
          this.unActive(obj, id);
        });
      }
    }
  }

  toggle(data) {
    data.open = !data.open;
  }

  newCenter(parentId, parentName) {
    if (this.permission) {
      this.flag = 2;
      this.unActive(this.menuList, parentId);
      this.form = null;
      this.title = '添加中心';
      this.form = this.organizationService.setCenterForm(1, null, parentName, parentId);
      this.formTwo = this.organizationService.setSiteForm(2, null, parentName, parentId);
      this.formThree = this.organizationService.setDepartmentForm(3, null, parentName, parentId);
      this.cdr.detectChanges();
    }
  }

  updateCenter(menu) {
    if (this.permission) {
      this.flag = 0;
      this.unActive(this.menuList, 0);
      this.form = null;
      this.title = '编辑中心';
      this.organizationService.getCenter(menu.menuId)
        .subscribe(res => {
          if (res.data && res.code === 0) {
            res.data.parentId = menu.parentId;
            this.form = this.organizationService.setCenterForm(1, res.data);
            this.cdr.detectChanges();
          }
        });
    }
  }

  newSite(parentId, parentName) {
    if (this.permission) {
      this.flag = 1;
      this.unActive(this.menuList, parentId);
      this.form = null;
      this.title = '添加站点';
      this.form = this.organizationService.setSiteForm(2, null, parentName, parentId);
      this.formTwo = this.organizationService.setDepartmentForm(3, null, parentName, parentId);
      this.cdr.detectChanges();
    }
  }

  updateSite(menu) {
    if (this.permission) {
      this.flag = 0;
      this.unActive(this.menuList, 0);
      this.form = null;
      this.title = '编辑站点';
      this.organizationService.getSite(menu.menuId)
        .subscribe(res => {
          if (res.data && res.code === 0) {
            res.data.parentId = menu.parentId;
            this.form = this.organizationService.setSiteForm(2, res.data);
            this.cdr.detectChanges();
          }
        });
    }
  }

  newDepartment(parentId, parentName) {
    if (this.permission) {
      this.flag = 0;
      this.unActive(this.menuList, parentId);
      this.form = null;
      this.title = '添加科室';
      this.form = this.organizationService.setDepartmentForm(3, null, parentName, parentId);
      this.cdr.detectChanges();
    }
  }

  updateDepartment(menu) {
    if (this.permission) {
      this.flag = 0;
      this.unActive(this.menuList, 0);
      this.form = null;
      this.title = '编辑科室';
      this.organizationService.getDepartment(menu.menuId)
        .subscribe(res => {
          if (res.data && res.code === 0) {
            res.data.parentId = menu.parentId;
            this.form = this.organizationService.setDepartmentForm(3, res.data);
            this.cdr.detectChanges();
          }
        });
    }
  }

  getValues(value) {
    if (value.status == 1) {
      delete value.status;
      delete value.picture;
      this.organizationService.updateCenter(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.form = null;
              this.getMenus();
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }
    if (value.status == 2) {
      delete value.status;
      delete value.picture;
      this.organizationService.updateSite(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.form = null;
              this.getMenus();
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }
    if (value.status == 3) {
      delete value.status;
      delete value.picture;
      this.organizationService.updateDepartment(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.form = null;
              this.getMenus();
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
}

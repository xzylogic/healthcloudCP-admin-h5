import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { MdDialog } from '@angular/material';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  containerConfig: ContainerConfig;
  menuList: any;
  form: any;
  title = '';

  constructor(
    @Inject('menu') private menuService,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.menuService.setMenuConfig();
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus()
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

  newMenu(parentId, parentName) {
    this.unActive(this.menuList, parentId);
    this.form = null;
    this.title = '新增菜单';
    this.form = this.menuService.setMenuFrom({
      parent: {parentId: parentId, parentName: parentName}
    });
    this.cdr.detectChanges();
  }

  updateMenu(menu) {
    this.unActive(this.menuList, 0);
    this.form = null;
    this.title = '编辑菜单';
    this.form = this.menuService.setMenuFrom({data: menu});
    this.cdr.detectChanges();
  }

  deleteMenu(menuId, menuName) {
    HintDialog(`您确定要删除菜单：${menuName}?`, this.dialog).afterClosed().subscribe(res => {
      if (res && res.key === 'confirm') {
        this.deleteAction(menuId);
      }
    });
  }

  deleteAction(menuId) {
    this.menuService.deleteMenu(menuId)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('菜单删除成功！重新登录后可查看菜单变化～', this.dialog).afterClosed().subscribe(() => {
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

  getValues(value) {
    this.menuService.updateMenu(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('菜单保存成功！重新登录后可查看菜单变化～', this.dialog).afterClosed().subscribe(() => {
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

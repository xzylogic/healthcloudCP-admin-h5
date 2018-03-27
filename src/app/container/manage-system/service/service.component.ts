import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DTreeEditType, DTreeEntity, DTreeFuncType, DTreeShowType } from '../../../libs/dtree/dtree.entity';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  treeType = DTreeFuncType.editor;
  serviceTree = [];

  formCategory: any;
  formItem: any;

  categoryLinks: any;
  itemLinks: any;

  permission: boolean; // 权限 | true 编辑 false 查看

  /**
   * 1-新增分类 2-新增分类和项目 3-编辑分类 4-新增项目 5-编辑项目
   * @type {number}
   */
  type = 0;

  constructor(
    @Inject('auth') private auth,
    @Inject('service') private serviceService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.serviceService.setServiceConfig();
    this.getServices();
  }

  ngOnDestroy() {

  }

  getServices() {
    this.route.params.subscribe(route => {
      if (route && route.menu && this.auth.getMenuPermission().indexOf(route.menu) > -1) {
        this.permission = true;
      }
      this.serviceService.getServices().subscribe(res => {
        if (res.code == 0 && res.data) {
          res.data.unpermit = this.permission ? DTreeShowType.oCreate : null;
          this.resetData(res.data, this.permission);
          this.serviceTree = [res.data];
        }
      });
    });
  }

  resetData(tree: DTreeEntity, permission) {
    if (tree.children) {
      tree.children.forEach(obj => {
        obj.unpermit = permission ?
          (obj.type == '1' ? DTreeShowType.all : DTreeShowType.updateDelete) :
          DTreeShowType.oShow;
        this.resetData(obj, permission);
      });
    }
  }

  handleUpdate(sourceData) {
    // 新增服务分类（第一层）
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level == 0) {
      this.type = 1;
      this.createServiceCategoryFirst(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 新增服务分类和服务项目（第二层）
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level == 1) {
      this.type = 2;
      this.createServiceCategory(sourceData.tree.menuId, sourceData.tree.menuName);
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 新增服务项目（第三层及以上）
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level > 1 && sourceData.tree.type != 2) {
      this.type = 4;
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 编辑服务分类（第一层）
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level == 1 && sourceData.tree.type != 2) {
      this.type = 3;
      this.updateServiceCategoryFirst(sourceData.tree);
    }
    // 编辑服务分类（非第一层）
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level != 1 && sourceData.tree.type != 2) {
      this.type = 3;
      this.updateServiceCategory(sourceData.tree);
    }
    // 编辑服务分类
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.type == 2) {
      this.type = 5;
      this.updateServiceItem(sourceData.tree);
    }
    // 查看服务分类（第一层）
    if (sourceData.type == DTreeEditType.toShow && sourceData.tree.level == 1 && sourceData.tree.type != 2) {
      this.type = 3;
      this.updateServiceCategoryFirst(sourceData.tree, true);
    }
    // 查看服务分类（非第一层）
    if (sourceData.type == DTreeEditType.toShow && sourceData.tree.level != 1 && sourceData.tree.type != 2) {
      this.type = 3;
      this.updateServiceCategory(sourceData.tree, true);
    }
    // 查看健康项目
    if (sourceData.type == DTreeEditType.toShow && sourceData.tree.type == 2) {
      this.type = 5;
      this.updateServiceItem(sourceData.tree, true);
    }
    // 删除服务
    if (sourceData.type == DTreeEditType.toDelete) {
      this.type = 0;
      console.log('delete');
      const delDialog = HintDialog(`您确定要删除${sourceData.tree.menuName}?`, this.dialog)
        .afterClosed().subscribe(res => {
          console.log(res);
          if (res && res.key == 'confirm') {
            this.deleteService(sourceData.tree.menuId);
            delDialog.unsubscribe();
          }
        });
    }
  }

  createServiceCategoryFirst(parentId, parentName) {
    if (this.categoryLinks) {
      this.formCategory = this.serviceService.setServiceCategoryFormFirst(parentId, parentName, this.categoryLinks);
    } else {
      this.serviceService.getLinks(1).subscribe(links => {
        this.categoryLinks = links;
        this.formCategory = this.serviceService.setServiceCategoryFormFirst(parentId, parentName, this.categoryLinks);
      });
    }
  }

  createServiceCategory(parentId, parentName) {
    if (this.categoryLinks) {
      this.formCategory = this.serviceService.setServiceCategoryForm(parentId, parentName, this.categoryLinks);
    } else {
      this.serviceService.getLinks(1).subscribe(links => {
        this.categoryLinks = links;
        this.formCategory = this.serviceService.setServiceCategoryForm(parentId, parentName, this.categoryLinks);
      });
    }
  }

  updateServiceCategoryFirst(treeData, disable?: boolean) {
    if (this.categoryLinks) {
      this.getCategoryDetail(treeData.menuId, (data) => {
        this.formCategory = this.serviceService.setServiceCategoryFormFirst(
          treeData.parentId, treeData.parentName,
          this.categoryLinks, data, disable
        );
      });
    } else {
      this.getCategoryDetailLinks(treeData.menuId, (data) => {
        this.categoryLinks = data.links;
        this.formCategory = this.serviceService.setServiceCategoryFormFirst(
          treeData.parentId, treeData.parentName,
          this.categoryLinks, data.data, disable
        );
      });
    }
  }

  updateServiceCategory(treeData, disable?: boolean) {
    if (this.categoryLinks) {
      this.getCategoryDetail(treeData.menuId, (data) => {
        this.formCategory = this.serviceService.setServiceCategoryForm(
          treeData.parentId, treeData.parentName,
          this.categoryLinks, data, disable
        );
      });
    } else {
      this.getCategoryDetailLinks(treeData.menuId, (data) => {
        this.categoryLinks = data.links;
        this.formCategory = this.serviceService.setServiceCategoryForm(
          treeData.parentId, treeData.parentName,
          this.categoryLinks, data.data, disable
        );
      });
    }
  }

  createServiceItem(parentId, parentName) {
    if (this.itemLinks) {
      this.formItem = this.serviceService.setServiceItemForm(parentId, parentName, this.itemLinks);
    } else {
      this.serviceService.getLinks(2).subscribe(links => {
        this.itemLinks = links;
        this.formItem = this.serviceService.setServiceItemForm(parentId, parentName, this.itemLinks);
      });
    }
  }

  updateServiceItem(treeData, disable?: boolean) {
    if (this.itemLinks) {
      this.getItemDetail(treeData.menuId, (data) => {
        if (data && data.linkType == 1) {
          data.serviceItemLink1 = data.serviceItemLink;
        }
        if (data && data.linkType == 2) {
          data.serviceItemLink2 = data.serviceItemLink;
        }
        this.formItem = this.serviceService.setServiceItemForm(
          treeData.parentId, treeData.parentName,
          this.itemLinks, data, disable
        );
      });
    } else {
      this.getItemDetailLinks(treeData.menuId, (data) => {
        this.itemLinks = data.links;
        if (data && data.linkType == 1) {
          data.serviceItemLink1 = data.serviceItemLink;
        }
        if (data && data.linkType == 2) {
          data.serviceItemLink2 = data.serviceItemLink;
        }
        this.formItem = this.serviceService.setServiceItemForm(
          treeData.parentId, treeData.parentName,
          this.itemLinks, data.data, disable
        );
      });
    }
  }

  getCategoryDetail(id, callback) {
    this.serviceService.getServiceCategory(id).subscribe(res => {
      if (res.code == 0 && res.data) {
        callback(res.data);
      } else {
        HintDialog(res.msg || '获取服务分类详情失败，请重试！', this.dialog);
      }
    }, err => {
      HintDialog('获取服务分类详情网络错误，请重试！', this.dialog);
      throw new Error(err);
    });
  }

  getCategoryDetailLinks(id, callback) {
    const getLinks = this.serviceService.getLinks(1);
    const getDetail = this.serviceService.getServiceCategory(id);
    Observable.forkJoin([getLinks, getDetail])
      .subscribe((res: Array<any>) => {
        console.log(res);
        if (res[0] && res[1].code == 0 && res[1].data) {
          callback({links: res[0], data: res[1].data});
        } else {
          HintDialog(res[1].msg || '获取初始数据失败，请重试！', this.dialog);
        }
      }, err => {
        HintDialog('网络错误，请重试！', this.dialog);
        throw new Error(err);
      });
  }

  getItemDetail(id, callback) {
    this.serviceService.getServiceItem(id).subscribe(res => {
      if (res.code == 0 && res.data) {
        callback(res.data);
      } else {
        HintDialog(res.msg || '获取服务项目详情失败，请重试！', this.dialog);
      }
    }, err => {
      HintDialog('获取服务项目详情网络错误，请重试！', this.dialog);
      throw new Error(err);
    });
  }

  getItemDetailLinks(id, callback) {
    const getLinks = this.serviceService.getLinks(2);
    const getDetail = this.serviceService.getServiceItem(id);
    Observable.forkJoin([getLinks, getDetail])
      .subscribe((res: Array<any>) => {
        if (res[1].code == 0 && res[1].data) {
          callback({links: res[0], data: res[1].data});
        } else {
          HintDialog(res[1].msg || '获取初始数据失败，请重试！', this.dialog);
        }
      }, err => {
        HintDialog('网络错误，请重试！', this.dialog);
        throw new Error(err);
      });
  }

  getCategoryValues(result: any) {
    if (result.isHomeShow == 0 || result.isHomeShow == 1) {
      if (result.isHomeShow == 0 && !result.homeImageUrl) {
        HintDialog('请选择首页分类图标', this.dialog);
      } else if (result.isHomeShow == 0 && !result.homeSort) {
        HintDialog('请选择首页分类顺序', this.dialog);
      } else {
        const data: ServiceCategoryFirstEntity = new ServiceCategoryFirstEntity(result);
        this.serviceService.saveServiceCategory(data)
          .subscribe(res => {
            if (res.code == 0) {
              HintDialog(res.msg || '保存成功！', this.dialog);
              this.getServices();
              this.type = 0;
            } else {
              HintDialog(res.msg || '保存失败！', this.dialog);
            }
          }, err => {
            HintDialog('网络请求失败，请重试！', this.dialog);
            throw new Error(err);
          });
      }
    } else {
      const data: ServiceCategoryEntity = new ServiceCategoryEntity(result);
      this.serviceService.saveServiceCategory(data)
        .subscribe(res => {
          if (res.code == 0) {
            HintDialog(res.msg || '保存成功！', this.dialog);
            this.getServices();
            this.type = 0;
          } else {
            HintDialog(res.msg || '保存失败！', this.dialog);
          }
        }, err => {
          HintDialog('网络请求失败，请重试！', this.dialog);
          throw new Error(err);
        });
    }
  }

  getItemValues(result: ServiceItemEntity) {
    if (result.linkType == 1 && !result.serviceItemLink1) {
      HintDialog('请选择服务项目链接', this.dialog);
    } else if (result.linkType == 2 && !result.serviceItemLink2) {
      HintDialog('请填写服务项目链接', this.dialog);
    } else {
      const data: ServiceItemEntity = new ServiceItemEntity(result);
      this.serviceService.saveServiceItem(data)
        .subscribe(res => {
          if (res.code == 0) {
            HintDialog(res.msg || '保存成功！', this.dialog);
            this.getServices();
            this.type = 0;
          } else {
            HintDialog(res.msg || '保存失败！', this.dialog);
          }
        }, err => {
          HintDialog('网络请求失败，请重试！', this.dialog);
          throw new Error(err);
        });
    }
  }

  deleteService(id) {
    this.serviceService.deleteService(id)
      .subscribe(res => {
        if (res.code == 0) {
          HintDialog(res.msg || '删除成功！', this.dialog);
          this.getServices();
        } else {
          HintDialog(res.msg || '删除失败！', this.dialog);
        }
      }, err => {
        HintDialog('网络链接失败，请重试！', this.dialog);
        throw new Error(err);
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
}

class ServiceCategoryFirstEntity {
  menuId?: string;
  parentId: string;
  categoryName: string;
  categoryLink: string;
  sort: number;
  isHomeShow: number;
  homeImageUrl: string;
  homeSort: number;
  delFlag: number;

  constructor(obj: ServiceCategoryFirstEntity) {
    if (obj.menuId) {
      this.menuId = obj.menuId;
    }
    this.parentId = obj.parentId;
    this.categoryName = obj.categoryName;
    this.categoryLink = obj.categoryLink;
    this.sort = obj.sort;
    this.isHomeShow = obj.isHomeShow;
    if (obj.isHomeShow == 0) {
      this.homeImageUrl = obj.homeImageUrl;
      this.homeSort = obj.homeSort;
    }
    this.delFlag = obj.delFlag;
  }
}

class ServiceCategoryEntity {
  menuId?: string;
  parentId: string;
  categoryName: string;
  imageUrl: string;
  categoryLink: string;
  sort: number;
  homeImageUrl: string;
  homeCategoryLink: string;
  homeSort: number;
  delFlag: number;

  constructor(obj: ServiceCategoryEntity) {
    if (obj.menuId) {
      this.menuId = obj.menuId;
    }
    this.parentId = obj.parentId;
    this.categoryName = obj.categoryName;
    this.imageUrl = obj.imageUrl;
    this.categoryLink = obj.categoryLink;
    this.sort = obj.sort;
    this.homeImageUrl = obj.homeImageUrl;
    this.homeCategoryLink = obj.homeCategoryLink;
    this.homeSort = obj.homeSort;
    this.delFlag = obj.delFlag;
  }
}

class ServiceItemEntity {
  menuId?: string;
  parentId: string;
  serviceName: string;
  itemImageUrl: string;
  linkType: number;
  serviceItemLink1: string;
  serviceItemLink2: string;
  serviceItemLink: string;
  sort: number;
  homeImageUrl: string;
  homeSort: number;
  isLogin: number;
  isRealName: number;
  delFlag: number;

  constructor(obj: ServiceItemEntity) {
    if (obj.menuId) {
      this.menuId = obj.menuId;
    }
    this.serviceItemLink = obj.linkType == 1 ? obj.serviceItemLink1 : obj.serviceItemLink2;
    this.parentId = obj.parentId;
    this.serviceName = obj.serviceName;
    this.itemImageUrl = obj.itemImageUrl;
    this.linkType = obj.linkType;
    this.sort = obj.sort;
    this.homeImageUrl = obj.homeImageUrl;
    this.homeSort = obj.homeSort;
    this.isLogin = obj.isLogin;
    this.isRealName = obj.isRealName;
    this.delFlag = obj.delFlag;
  }
}

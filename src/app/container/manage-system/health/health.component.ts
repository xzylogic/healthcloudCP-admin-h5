import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DTreeEditType, DTreeEntity, DTreeFuncType, DTreeShowType } from '../../../libs/dtree/dtree.entity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  treeType = DTreeFuncType.editor;
  healthTree = [];

  formClassify: any;
  formProject: any;

  healthLinks: any;

  permission: boolean; // 权限 | true 编辑 false 查看

  /**
   * 1-新增分类 2-编辑分类 3-新增项目 4-编辑项目
   * @type {number}
   */
  type = 0;

  constructor(
    @Inject('auth') private auth,
    @Inject('health') private healthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.healthService.setHealthConfig();
    this.getHealthTree();
  }

  ngOnDestroy() {

  }

  getHealthTree() {
    this.route.params.subscribe(route => {
      if (route && route.menu && this.auth.getMenuPermission().indexOf(route.menu) > -1) {
        this.permission = true;
      }
      this.healthService.getHealthTree().subscribe(res => {
        if (res.code == 0 && res.data) {
          res.data.unpermit = this.permission ? DTreeShowType.oCreate : null;
          res.data.level = 0;
          this.resetData(res.data, this.permission);
          this.healthTree = [res.data];
        }
      }, err => {
        HintDialog('网络请求失败，请刷新重试！', this.dialog);
        throw new Error(err);
      });
    });
  }

  resetData(tree: DTreeEntity, permission) {
    if (tree.children) {
      tree.children.forEach(obj => {
        obj.unpermit = permission ? DTreeShowType.all : DTreeShowType.oShow;
        obj.level = 1;
        if (obj.children) {
          obj.children.forEach(cobj => {
            cobj.unpermit = permission ? DTreeShowType.updateDelete : DTreeShowType.oShow;
            cobj.level = 2;
          });
        }
      });
    }
  }

  handleUpdate(sourceData) {
    // 新增健康分类
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level == 0) {
      this.type = 1;
      this.createHealthClassify(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 编辑健康分类
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level == 1) {
      this.type = 2;
      this.updateHealthClassify(sourceData.tree);
    }
    // 新增健康项目
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level == 1) {
      this.type = 3;
      this.createHealthProject(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 编辑健康项目
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level == 2) {
      this.type = 4;
      this.updateHealthProject(sourceData.tree);
    }
    // 查看健康分类
    if (sourceData.type == DTreeEditType.toShow && sourceData.tree.level == 1) {
      this.type = 2;
      this.updateHealthClassify(sourceData.tree, true);
    }
    // 查看健康项目
    if (sourceData.type == DTreeEditType.toShow && sourceData.tree.level == 2) {
      this.type = 4;
      this.updateHealthProject(sourceData.tree, true);
    }
    // 删除服务
    if (sourceData.type == DTreeEditType.toDelete) {
      this.type = 0;
      console.log('delete');
      const delDialog = HintDialog(`您确定要删除${sourceData.tree.menuName}?`, this.dialog)
        .afterClosed().subscribe(res => {
          if (res && res.key == 'confirm') {
            this.deleteHealth(sourceData.tree.menuId);
            delDialog.unsubscribe();
          }
        });
    }
  }

  createHealthClassify(parentId, parentName) {
    if (this.healthLinks) {
      this.formClassify = this.healthService.setHealthClassifyForm(parentId, parentName, this.healthLinks);
    } else {
      this.healthService.getUrls().subscribe(links => {
        this.healthLinks = links;
        this.formClassify = this.healthService.setHealthClassifyForm(parentId, parentName, this.healthLinks);
      }, err => {
        console.log(err);
      });
    }
  }

  updateHealthClassify(treeData, disable?) {
    if (this.healthLinks) {
      this.getDetail(treeData.menuId, (data) => {
        this.formClassify = this.healthService.setHealthClassifyForm(
          treeData.parentId, treeData.parentName,
          this.healthLinks, data, disable
        );
      });
    } else {
      this.getLinksAndDetail(treeData.menuId, (data) => {
        this.healthLinks = data.links;
        this.formClassify = this.healthService.setHealthClassifyForm(
          treeData.parentId, treeData.parentName,
          this.healthLinks, data.data, disable
        );
      });
    }
  }

  createHealthProject(parentId, parentName) {
    if (this.healthLinks) {
      this.formProject = this.healthService.setHealthProjectForm(parentId, parentName, this.healthLinks);
    } else {
      this.healthService.getUrls().subscribe(links => {
        this.healthLinks = links;
        this.formProject = this.healthService.setHealthProjectForm(parentId, parentName, this.healthLinks);
      }, err => {
        console.log(err);
      });
    }
  }

  updateHealthProject(treeData, disable?) {
    if (this.healthLinks) {
      this.getDetail(treeData.menuId, (data) => {
        if (data && data.url_type == 0) {
          data.url0 = data.url;
        }
        if (data && data.url_type == 1) {
          data.url1 = data.url;
        }
        this.formProject = this.healthService.setHealthProjectForm(
          data.classify_id, treeData.parentName,
          this.healthLinks, data, disable
        );
      });
    } else {
      this.getLinksAndDetail(treeData.menuId, (res) => {
        this.healthLinks = res.links;
        if (res.data && res.data.url_type == 0) {
          res.data.url0 = res.data.url;
        }
        if (res.data && res.data.url_type == 1) {
          res.data.url1 = res.data.url;
        }
        this.formProject = this.healthService.setHealthProjectForm(
          res.data.classify_id, treeData.parentName,
          this.healthLinks, res.data, disable
        );
      });
    }
  }

  getDetail(id, callback) {
    this.healthService.getHealthDetail(id).subscribe(res => {
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

  getLinksAndDetail(id, callback) {
    const getLinks = this.healthService.getUrls();
    const getDetail = this.healthService.getHealthDetail(id);
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

  getClassifyValues(result) {
    this.healthService.saveHealthClassify(result)
      .subscribe(res => {
        if (res.code == 0) {
          HintDialog(res.msg || '保存成功！', this.dialog);
          this.getHealthTree();
          this.type = 0;
        } else {
          HintDialog(res.msg || '保存失败！', this.dialog);
        }
      }, err => {
        HintDialog('网络链接失败，请重试！', this.dialog);
        throw new Error(err);
      });
  }

  getItemValues(result: HealthItemEntity) {
    if (result.url_type == 0 && !result.url0) {
      HintDialog('请选择健康项目链接', this.dialog);
    } else if (result.url_type == 1 && !result.url1) {
      HintDialog('请填写健康项目链接', this.dialog);
    } else {
      const data: HealthItemEntity = new HealthItemEntity(result);
      this.healthService.saveHealthProject(data)
        .subscribe(res => {
          if (res.code == 0) {
            HintDialog(res.msg || '保存成功！', this.dialog);
            this.getHealthTree();
            this.type = 0;
          } else {
            HintDialog(res.msg || '保存失败！', this.dialog);
          }
        }, err => {
          HintDialog('网络链接失败，请重试！', this.dialog);
          throw new Error(err);
        });
    }
  }

  getClassifyUpdateValues(result) {
    this.healthService.updateHealth(result)
      .subscribe(res => {
        if (res.code == 0) {
          HintDialog(res.msg || '保存成功！', this.dialog);
          this.getHealthTree();
          this.type = 0;
        } else {
          HintDialog(res.msg || '保存失败！', this.dialog);
        }
      }, err => {
        HintDialog('网络链接失败，请重试！', this.dialog);
        throw new Error(err);
      });
  }

  getItemUpdateValues(result) {
    if (result.url_type == 0 && !result.url0) {
      HintDialog('请选择健康项目链接', this.dialog);
    } else if (result.url_type == 1 && !result.url1) {
      HintDialog('请填写健康项目链接', this.dialog);
    } else {
      const data: HealthItemEntity = new HealthItemEntity(result);
      this.getClassifyUpdateValues(data);
    }
  }

  deleteHealth(id) {
    this.healthService.deleteHealth(id)
      .subscribe(res => {
        if (res.code == 0) {
          HintDialog(res.msg || '删除成功！', this.dialog);
          this.getHealthTree();
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

class HealthItemEntity {
  id?: string;
  classify_id: string;
  name: string;
  ico: string;
  url0: number;
  url1: number;
  url?: string | number;
  url_type: number | string;
  sequence: number | string;
  enable: number | string;
  certification: number | string;

  constructor(obj: HealthItemEntity) {
    if (obj.id) {
      this.id = obj.id;
    }
    if (obj.url_type == 0) {
      this.url = obj.url0;
    }
    if (obj.url_type == 1) {
      this.url = obj.url1;
    }
    this.url_type = obj.url_type;
    this.name = obj.name;
    this.classify_id = obj.classify_id;
    this.ico = obj.ico;
    this.sequence = obj.sequence;
    this.enable = obj.enable;
    this.certification = obj.certification;
  }
}

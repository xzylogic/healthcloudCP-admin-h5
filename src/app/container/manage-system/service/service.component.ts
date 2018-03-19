import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DTreeEditType, DTreeEntity, DTreeFuncType, DTreeShowType } from '../../../libs/dtree/dtree.entity';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  treeType = DTreeFuncType.editor;
  serviceTree = [];

  formCategory: any;
  formItem: any;
  /**
   * 1-新增分类 2-编辑分类 3-新增项目 4-编辑项目
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

  getServices() {
    this.serviceService.getServices()
      .subscribe(res => {
        console.log(res);
        if (res.code == 0) {
          res.data.unpermit = DTreeShowType.oCreate;
          this.resetData(res.data);
          this.serviceTree.push(res.data);
        }
      });
  }

  resetData(tree: DTreeEntity) {
    if (tree.children) {
      tree.children.forEach(obj => {
        obj.unpermit = obj.type == '1' ? DTreeShowType.all : DTreeShowType.updateDelete;
        this.resetData(obj);
      });
    }
  }

  handleUpdate(sourceData) {
    console.log(sourceData);
    // 新增服务分类（第一层）
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level == 0 && sourceData.tree.type != 2) {
      this.type = 1;
      this.createServieCategoryFirst(sourceData.tree.menuId, sourceData.tree.menuName);
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 新增服务分类（非第一层）
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.level != 0 && sourceData.tree.type != 2) {
      this.type = 1;
      this.createServieCategory(sourceData.tree.menuId, sourceData.tree.menuName);
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 编辑服务分类（第一层）
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level == 1 && sourceData.tree.type != 2) {
      this.type = 2;
      this.updateServieCategoryFirst(sourceData.tree);
    }
    // 编辑服务分类（非第一层）
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.level != 1 && sourceData.tree.type != 2) {
      this.type = 2;
      this.updateServieCategory(sourceData.tree);
    }
    // 新增服务项目
    if (sourceData.type == DTreeEditType.toCreate && sourceData.tree.type == 2) {
      this.type = 3;
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    // 编辑服务分类
    if (sourceData.type == DTreeEditType.toUpdate && sourceData.tree.type == 2) {
      this.type = 4;
      this.updateServiceItem(sourceData.tree);
    }
    // 删除服务
    if (sourceData.type == DTreeEditType.toDelete) {
      this.type = 0;
      console.log('delete');
    }
  }

  createServieCategoryFirst(parentId, parentName) {
    this.formCategory = this.serviceService.setServiceCategoryFormFirst(parentId, parentName, [{id: 1, name: 1}]);
  }

  createServieCategory(parentId, parentName) {
    this.formCategory = this.serviceService.setServiceCategoryForm(parentId, parentName, [{id: 1, name: 1}]);
  }

  updateServieCategoryFirst(treeData) {
    console.log(treeData);
    this.getCategoryDetail(treeData.menuId, (data) => {
      if (data) {
        this.formCategory = this.serviceService.setServiceCategoryFormFirst(
          treeData.parentId, treeData.parentName, [{
            id: 1,
            name: 1
          }], data);
      }
    });
  }

  updateServieCategory(treeData) {
    console.log(treeData);
    this.getCategoryDetail(treeData.menuId, (data) => {
      if (data) {
        this.formCategory = this.serviceService.setServiceCategoryForm(
          treeData.parentId, treeData.parentName, [{
            id: 1,
            name: 1
          }], data);
      }
    });
  }

  createServiceItem(parentId, parentName) {
    this.formItem = this.serviceService.setServiceItemForm(parentId, parentName, [{id: 1, name: 1}]);
  }

  updateServiceItem(treeData) {
    this.getItemDetail(treeData.menuId, (data) => {
      if (data) {
        this.formItem = this.serviceService.setServiceItemForm(
          treeData.parentId, treeData.parentName, [{id: 1, name: 1}], data);
      }
    });
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

  getItemDetail(id, callback) {
    this.serviceService.getServiceCategory(id).subscribe(res => {
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

  getValues(result) {
    console.log(result);
  }
}

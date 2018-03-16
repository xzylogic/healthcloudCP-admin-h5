import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { DTreeEditType, DTreeEntity, DTreeFuncType } from '../../../libs/dtree/dtree.entity';

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
          res.data.unpermit = DTreeEditType.create;
          this.resetData(res.data);
          this.serviceTree.push(res.data);
        }
      });
  }

  resetData(tree: DTreeEntity) {
    if (tree.children) {
      tree.children.forEach(obj => {
        obj.unpermit = obj.type == '1' ? DTreeEditType.all : DTreeEditType.update;
        this.resetData(obj);
      });
    }
  }

  handleUpdate(sourceData) {
    console.log(sourceData);
    if (sourceData.type == DTreeEditType.create && sourceData.tree.type != 2) {
      this.createServieCategory(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    if (sourceData.type == DTreeEditType.update && sourceData.tree.type != 2) {
      this.updateServieCategory(sourceData.tree);
    }
    if (sourceData.type == DTreeEditType.create && sourceData.tree.type == 2) {
      this.createServiceItem(sourceData.tree.menuId, sourceData.tree.menuName);
    }
    if (sourceData.type == DTreeEditType.update && sourceData.tree.type == 2) {
      this.updateServiceItem(sourceData.tree);
    }
  }

  createServieCategory(parentId, parentName) {
    console.log(parentId, parentName);
    this.formCategory = this.serviceService.setServiceCategoryFormFirst(parentId, parentName, {id: 1, name: 1});
  }

  updateServieCategory(treeData) {
    console.log(treeData);
  }

  createServiceItem(parentId, parentName) {
    console.log(parentId, parentName);
  }

  updateServiceItem(treeData) {
    console.log(treeData);
  }

  getValues(result) {
    console.log(result);
  }
}

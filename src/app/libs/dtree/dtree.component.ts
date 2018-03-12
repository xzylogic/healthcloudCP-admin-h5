import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DTreeEditEntity, DTreeEntity, DTreeFuncType } from './dtree.entity';

@Component({
  selector: 'app-dtree',
  template: `
    <ul *ngIf="trees" class="tree__list">
      <li *ngFor="let tree of trees" class="clear">
        <app-dtree-child [treeNode]="tree" [func]="func" (HandleChecked)="checkedEmit($event)"
                         (HandleUpdate)="updateEmit($event)" (HandleCreate)="createEmit($event)"
        ></app-dtree-child>
        <app-dtree *ngIf="tree.children&&tree.open" [trees]="tree.children" [func]="func"
                   (HandleChecked)="checkedEmit($event, tree)"
                   (HandleUpdate)="updateEmit($event, tree)" (HandleCreate)="createEmit($event, tree)"
        ></app-dtree>
      </li>
    </ul>
  `,
  styleUrls: ['./dtree.component.scss']
})
export class DTreeComponent {
  @Input() func: DTreeFuncType;
  @Input() trees: DTreeEntity[];

  @Output() HandleUpdate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleCreate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleChecked: EventEmitter<DTreeEntity> = new EventEmitter();

  createEmit(editData: DTreeEditEntity, parent?) {
    this.setAllUnActive(parent || editData.tree);
    editData.tree.active = true;
    this.HandleCreate.emit(editData);
  }

  updateEmit(editData: DTreeEditEntity, parent?) {
    this.setAllUnActive(parent || editData.tree);
    editData.tree.active = true;
    this.HandleUpdate.emit(editData);
  }

  checkedEmit(tree: DTreeEntity, parent?: DTreeEntity) {
    this.setChildrenChecked(tree);
    if (parent && tree.checked) {
      parent.checked = tree.checked;
      let pIndeterminate = false;
      if (parent.children) {
        parent.children.forEach(obj => {
          if (!obj.checked) {
            pIndeterminate = true;
          }
        });
      }
      parent.indeterminate = pIndeterminate;
    } else if (parent && !tree.checked) {
      let pChecked = false;
      if (parent.children) {
        parent.children.forEach(obj => {
          if (obj.checked) {
            pChecked = true;
          }
        });
      }
      parent.checked = pChecked;
      parent.indeterminate = pChecked;
    }
    this.HandleChecked.emit(tree);
  }

  setChildrenChecked(tree: DTreeEntity) {
    if (tree.children) {
      tree.children.forEach(childTree => {
        childTree.checked = tree.checked;
        childTree.indeterminate = false;
        this.setChildrenChecked(childTree);
      });
    }
  }

  setAllUnActive(tree: DTreeEntity) {
    tree.active = false;
    if (tree.children) {
      tree.children.forEach(childTree => {
        childTree.active = false;
        this.setAllUnActive(childTree);
      });
    }
  }
}

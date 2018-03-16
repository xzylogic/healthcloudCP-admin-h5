import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DTreeEditEntity, DTreeEditType, DTreeEntity, DTreeFuncType } from './dtree.entity';

@Component({
  selector: 'app-dtree-child',
  template: `
    <div class="clear tree__p" *ngIf="this.func===dTreeFuncType.editor">
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="!treeNode.open&&treeNode.children">add</mat-icon>
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="treeNode.open&&treeNode.children">remove</mat-icon>
      <mat-icon class="tree__icon block" *ngIf="!treeNode.children">block</mat-icon>

      <p class="tree__span" *ngIf="treeNode.unpermit===dTreeEditType.all||treeNode.unpermit===dTreeEditType.create"
         [class.active]="treeNode.active" (click)="updateTreeEmit(treeNode,dTreeEditType.create)">
        {{treeNode.menuName}}
      </p>
      <p class="tree__span cursor" *ngIf="treeNode.unpermit===dTreeEditType.update" [class.active]="treeNode.active">
        {{treeNode.menuName}}
      </p>
      <p class="tree__span cursor" *ngIf="treeNode.unpermit===dTreeEditType.show">
        {{treeNode.menuName}}
      </p>

      <button mat-icon-button color="primary" (click)="updateTreeEmit(treeNode,dTreeEditType.update)"
              *ngIf="treeNode.unpermit===dTreeEditType.all||treeNode.unpermit===dTreeEditType.update">
        <mat-icon aria-label="edit">mode_edit</mat-icon>
      </button>
      <button mat-icon-button color="primary" *ngIf="treeNode.unpermit===dTreeEditType.show">
        <mat-icon aria-label="edit">visibility</mat-icon>
      </button>
    </div>

    <div class="clear tree__p" *ngIf="this.func===dTreeFuncType.checkbox">
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="!treeNode.open&&treeNode.children">add</mat-icon>
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="treeNode.open&&treeNode.children">remove</mat-icon>
      <mat-icon class="tree__icon block" *ngIf="!treeNode.children">block</mat-icon>

      <mat-checkbox class="tree__checkbox" [(ngModel)]="treeNode.checked" [(indeterminate)]="treeNode.indeterminate"
                    (change)="checkedChangeEmit(treeNode)"></mat-checkbox>
      <p class="tree__span cursor">{{treeNode.menuName}}</p>
    </div>
  `,
  styleUrls: ['./dtree.component.scss']
})
export class DTreeChildComponent {
  @Input() func: DTreeFuncType;
  @Input() treeNode: DTreeEntity;

  @Output() HandleUpdate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleChecked: EventEmitter<DTreeEntity> = new EventEmitter();

  dTreeFuncType = DTreeFuncType;
  dTreeEditType = DTreeEditType;

  constructor() {
  }

  toggleOpen(node: DTreeEntity) {
    node.open = !node.open;
  }

  updateTreeEmit(tree: DTreeEntity, type: DTreeEditType) {
    this.HandleUpdate.emit(new DTreeEditEntity(type, tree));
  }

  checkedChangeEmit(tree) {
    this.HandleChecked.emit(tree);
  }
}

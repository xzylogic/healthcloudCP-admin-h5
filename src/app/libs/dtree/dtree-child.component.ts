import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DTreeEditEntity, DTreeEditType, DTreeEntity } from './dtree.entity';

@Component({
  selector: 'app-dtree-child',
  template: `
    <div class="clear tree__p">
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="!treeNode.open&&treeNode.children">add</mat-icon>
      <mat-icon class="tree__icon" (click)="toggleOpen(treeNode)" *ngIf="treeNode.open&&treeNode.children">remove</mat-icon>
      <mat-icon class="tree__icon block" *ngIf="!treeNode.children">block</mat-icon>
      <mat-checkbox [(ngModel)]="treeNode.checked" [(indeterminate)]="treeNode.indeterminate"
                    (change)="checkedChangeEmit(treeNode)"></mat-checkbox>
      <p class="tree__span" [class.active]="treeNode.active" (click)="createTreeEmit(treeNode)"
         *ngIf="!treeNode.unPermit">{{treeNode.menuName}}</p>
      <p class="tree__span" *ngIf="treeNode.unPermit">{{treeNode.menuName}}</p>
      <button mat-icon-button color="primary" (click)="updateTreeEmit(treeNode)" *ngIf="!treeNode.unPermit">
        <mat-icon aria-label="edit">mode_edit</mat-icon>
      </button>
      <button mat-icon-button color="primary" *ngIf="treeNode.unPermit">
        <mat-icon aria-label="edit">visibility</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./dtree.component.scss']
})
export class DTreeChildComponent {
  @Input() treeNode: DTreeEntity;

  @Output() HandleCreate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleUpdate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleChecked: EventEmitter<DTreeEntity> = new EventEmitter();

  constructor() {
  }

  toggleOpen(node: DTreeEntity) {
    node.open = !node.open;
  }

  createTreeEmit(tree: DTreeEntity) {
    this.HandleCreate.emit(new DTreeEditEntity(DTreeEditType.create, tree));
  }

  updateTreeEmit(tree: DTreeEntity) {
    this.HandleUpdate.emit(new DTreeEditEntity(DTreeEditType.update, tree));
  }

  checkedChangeEmit(tree) {
    this.HandleChecked.emit(tree);
  }
}

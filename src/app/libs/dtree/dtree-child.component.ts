import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DTreeEditEntity, DTreeEditType, DTreeEntity, DTreeFuncType, DTreeShowType } from './dtree.entity';

@Component({
  selector: 'app-dtree-child',
  templateUrl: './dtree-child.component.html',
  styleUrls: ['./dtree.component.scss']
})
export class DTreeChildComponent {
  @Input() func: DTreeFuncType;
  @Input() treeNode: DTreeEntity;

  @Output() HandleUpdate: EventEmitter<DTreeEditEntity> = new EventEmitter();
  @Output() HandleChecked: EventEmitter<DTreeEntity> = new EventEmitter();

  dTreeFuncType = DTreeFuncType;
  dTreeEditType = DTreeEditType;
  dTreeShowType = DTreeShowType;

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

  getSpanCreate(permit: DTreeShowType): boolean {
    return permit === DTreeShowType.all ||
      permit === DTreeShowType.oCreate ||
      permit === DTreeShowType.createDelete ||
      permit === DTreeShowType.createUpdate;
  }

  getSpanUpdateDelete(permit: DTreeShowType): boolean {
    return permit === DTreeShowType.oUpdate ||
      permit === DTreeShowType.oDelete ||
      permit === DTreeShowType.updateDelete;
  }

  getSpanShow(permit: DTreeShowType): boolean {
    return permit !== DTreeShowType.all &&
      permit !== DTreeShowType.oCreate &&
      permit !== DTreeShowType.oUpdate &&
      permit !== DTreeShowType.oDelete &&
      permit !== DTreeShowType.createDelete &&
      permit !== DTreeShowType.updateDelete &&
      permit !== DTreeShowType.createUpdate;
  }

  getUpdate(permit: DTreeShowType): boolean {
    return permit === DTreeShowType.all ||
      permit === DTreeShowType.oUpdate ||
      permit === DTreeShowType.createUpdate ||
      permit === DTreeShowType.updateDelete;
  }

  getDelete(permit: DTreeShowType): boolean {
    return permit === DTreeShowType.all ||
      permit === DTreeShowType.oDelete ||
      permit === DTreeShowType.createDelete ||
      permit === DTreeShowType.updateDelete;
  }

  getShow(permit: DTreeShowType): boolean {
    return permit === DTreeShowType.oShow;
  }
}

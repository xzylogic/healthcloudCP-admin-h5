export class DTreeEntity {
  menuId: string | number;
  menuName: string;
  level: any;
  parentId?: string | number;
  type?: any;
  checked?: boolean;
  indeterminate?: boolean;
  active?: boolean;
  open?: boolean;
  unpermit?: DTreeShowType;
  children?: DTreeEntity[];

  constructor(obj: DTreeEntity) {
    this.menuId = obj.menuId;
    this.menuName = obj.menuName;
    this.level = obj.level;
    this.parentId = obj.parentId || 0;
    this.type = obj.type || null;
    this.checked = !!obj.checked;
    this.indeterminate = !!obj.indeterminate;
    this.active = !!obj.active;
    this.open = !!obj.open;
    this.unpermit = obj.unpermit || DTreeShowType.oShow;
    this.children = obj.children || [];
  }
}

export enum DTreeFuncType {checkbox, editor}

export enum DTreeShowType {oCreate, oUpdate, oDelete, oShow, createUpdate, createDelete, updateDelete, all}

export enum DTreeEditType {toCreate, toUpdate, toDelete}

export class DTreeEditEntity {
  type: DTreeEditType;
  tree: DTreeEntity;

  constructor(type: DTreeEditType, tree: DTreeEntity) {
    this.type = type;
    this.tree = tree;
  }
}

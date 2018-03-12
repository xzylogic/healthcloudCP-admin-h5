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
  unpermit?: boolean;
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
    this.unpermit = !!obj.unpermit;
    this.children = obj.children || [];
  }
}

export enum DTreeFuncType {checkbox, editor}

export enum DTreeEditType {create, update}

export class DTreeEditEntity {
  type: DTreeEditType;
  tree: DTreeEntity;

  constructor(type: DTreeEditType, tree: DTreeEntity) {
    this.type = type;
    this.tree = tree;
  }
}

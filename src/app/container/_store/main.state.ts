export interface IMainState {
  readonly adminId: number;
  readonly adminName: string;
  readonly navigation: Menu[];
  readonly navTree: any;
}

export class Menu {
  menuId: string;
  menuName: string;
  checked?: boolean;
  parentId?: string;
  href?: string;
  children?: Menu[];
  open?: boolean;
  activate?: boolean;
}

export class Admin {
  id: number;
  name: string;
  hospitalName: string;
  departmentName: string;

  constructor(obj?: Admin) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.hospitalName = obj && obj.hospitalName || '';
    this.departmentName = obj && obj.departmentName || '';
  }
}

export class InitPayload {
  path: string;
}

export class TagPayload {
  key: string;
  group: string;
  tag: number;
}

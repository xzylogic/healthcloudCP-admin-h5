export interface IMainState {
  readonly adminId: number;
  readonly adminName: string;
  readonly navigation: Menu[];
}

export class Menu {
  menuId: string;
  menuName: string;
  checked?: boolean;
  parentId?: string;
  href?: string;
  children?: Menu[];
  open?: boolean;
}

export class Admin {
  id: number;
  name: string;

  constructor(obj?: Admin) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
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
